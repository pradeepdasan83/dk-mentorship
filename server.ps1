$port = 3000
$prefix = "http://localhost:$port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

Write-Host "Starting local dev server at $prefix..."
$listener.Start()
Write-Host "Local dev server listening on $prefix"

$rootFolder = "c:\Project\DK"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $urlPath = $request.Url.LocalPath
    if ($urlPath -eq "/" -or $urlPath -eq "") {
        $urlPath = "/index.html"
    }

    $filePath = Join-Path $rootFolder $urlPath.TrimStart('/')

    if (Test-Path $filePath -PathType Leaf) {
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()

        switch ($ext) {
            ".html" { $response.ContentType = "text/html; charset=utf-8" }
            ".css"  { $response.ContentType = "text/css" }
            ".js"   { $response.ContentType = "application/javascript" }
            ".json" { $response.ContentType = "application/json" }
            ".png"  { $response.ContentType = "image/png" }
            ".jpg"  { $response.ContentType = "image/jpeg" }
            ".svg"  { $response.ContentType = "image/svg+xml" }
            default { $response.ContentType = "text/plain" }
        }

        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $response.StatusCode = 404
        $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
    }

    $response.Close()
}
