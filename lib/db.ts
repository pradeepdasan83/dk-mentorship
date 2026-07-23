import { getPrisma } from './prisma';

export interface MenteeInput {
  name: string;
  email: string;
  phone?: string;
  linkedinUrl?: string;
  currentRole?: string;
  company?: string;
}

export interface BookingInput {
  name: string;
  email: string;
  phone?: string;
  currentRole?: string;
  type: 'DISCOVERY_CALL' | 'MENTORSHIP_1ON1' | 'MOCK_INTERVIEW';
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
  goals?: string;
}

export interface ServiceAppInput {
  name: string;
  email: string;
  phone?: string;
  currentRole?: string;
  linkedinUrl?: string;
  serviceTitle: string;
  priceAmount: number;
  notes?: string;
  paymentToken?: string;
  transactionId?: string;
}

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SiteContentInput {
  heroTag?: string;
  heroTitle?: string;
  heroSubtext?: string;
  mentorName?: string;
  mentorRole?: string;
  mentorImageUrl?: string;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
  stat4Value?: string;
  stat4Label?: string;
  service1Title?: string;
  service1Price?: number;
  service1Unit?: string;
  service1Desc?: string;
  service1Badge?: string;
  service2Title?: string;
  service2Price?: number;
  service2Unit?: string;
  service2Desc?: string;
  service2Badge?: string;
  service3Title?: string;
  service3Price?: number;
  service3Unit?: string;
  service3Desc?: string;
  service4Title?: string;
  service4Price?: number;
  service4Unit?: string;
  service4Desc?: string;
  approachTitle?: string;
  approachSub?: string;
  approachImgUrl?: string;
  adv1Title?: string;
  adv1Desc?: string;
  adv2Title?: string;
  adv2Desc?: string;
  adv3Title?: string;
  adv3Desc?: string;
  ctaTitle?: string;
  ctaSub?: string;
}

const fallbackStore = {
  content: {
    heroTag: "AUTHORITATIVE • DYNAMIC • PREMIUM",
    heroTitle: "Transform Your Professional Identity With Strategic Mentorship.",
    heroSubtext: "Empowering high-level professionals to command authority and achieve energetic prestige in their careers through curated LinkedIn strategies and 1:1 wisdom sessions.",
    mentorName: "Diileep Kumar Sathyadasan",
    mentorRole: "Strategic Executive Career Mentor",
    mentorImageUrl: "https://lh3.googleusercontent.com/aida/AP1WRLv39MngB3vq533uO2okUmuM0bGY9vC77Z2YYFJbEH2eM2AsSiEgvH00u9MScf-z3A_7W4HMnF1gZx-GtddmEgEcMY3apFqd5HKCIFr0gzkX63r0tH9IY2BuAZwFgw9roqqb9CXIHMTJd3iGdQwhrvjSGDARHGGtsPyeh8znHqRawq-WvRk3YoV5pcjjln_69cFQd1WEIJBIvNTpjXMTDG8pTn0qb4cDCI1W3fMpvb1wLPIeKC-15Tohq0g",
    stat1Value: "500+",
    stat1Label: "MENTEES GUIDED",
    stat2Value: "₹15Cr+",
    stat2Label: "SALARY HIKES SECURED",
    stat3Value: "100+",
    stat3Label: "LINKEDIN OPTIMIZATIONS",
    stat4Value: "15+",
    stat4Label: "YEARS EXPERIENCE",

    service1Title: "LinkedIn Profile Building",
    service1Price: 4999,
    service1Unit: "/profile",
    service1Desc: "Complete overhaul of your digital executive presence. SEO optimization, headline crafting, and high-impact About section that converts recruiters.",
    service1Badge: "POPULAR CHOICE",

    service2Title: "1:1 Executive Mentorship",
    service2Price: 2499,
    service2Unit: "/60 mins",
    service2Desc: "Direct 1-on-1 strategic access for executive career pivoting, salary negotiation strategies, and leadership transition.",
    service2Badge: "HIGH IMPACT",

    service3Title: "ATS Resume Design",
    service3Price: 2999,
    service3Unit: "/resume",
    service3Desc: "ATS-optimized executive resumes engineered to pass mechanical filters and compel hiring directors.",

    service4Title: "Corporate Mock Interviews",
    service4Price: 1999,
    service4Unit: "/mock session",
    service4Desc: "Prepare for high-stakes C-suite and Senior Leadership roles with realistic pressure, roleplay, and actionable feedback.",

    approachTitle: "The DKS Advantage",
    approachSub: "A bespoke mentoring system developed over 15+ years of guiding senior professionals to unprecedented career breakthroughs.",
    approachImgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAjNmGdKN1BApB5BFlDQ7MRmc_c8K_NOq4eyFbVVxaD08iYsv6agypIMfdiTCnMrdxfFfb2-Uqm8LlUfSdwit254SzTGyXe_hDzEV5i9fj_SkjsYiRAbkUx5fxJKv-0wqfhS8EWy-n_jhBQY9KXT9yTx7d4Bfz3iyN5hadYGOH_wkQGMiJ3FbeB0N93TwBXTB9HLdRHJBJJjwFfHE703wAkCpbuYt8sNGPIF9IF4SdIuN3cgiZFp4t",
    adv1Title: "Authority First",
    adv1Desc: "We don't just build profiles; we build executive authorities. Your digital presence will command respect before you even enter the room.",
    adv2Title: "Growth Rhythm",
    adv2Desc: "Implementing an 8px baseline rhythm to your career growth—mathematically harmonious and strategically sound for maximum ROI.",
    adv3Title: "Tonal Layering",
    adv3Desc: "Layering soft skills with technical prowess to create a sophisticated, multifaceted professional personality.",

    ctaTitle: "Ready to Elevate Your Career Trajectory?",
    ctaSub: "Join 500+ high-achieving professionals who have redefined their authority. Stop waiting for opportunities—start creating them today.",
  },
  mentees: [] as any[],
  bookings: [] as any[],
  serviceApps: [] as any[],
  payments: [] as any[],
  contacts: [] as any[],
};

export async function getSiteContent() {
  try {
    const db = getPrisma() as any;
    if (!db || !db.siteContent) return { content: fallbackStore.content, source: 'memory' };

    let content = await db.siteContent.findUnique({
      where: { id: 'main_site_content' },
    });

    if (!content) {
      content = await db.siteContent.create({
        data: { id: 'main_site_content' },
      });
    }

    return { content: { ...fallbackStore.content, ...content }, source: 'postgresql' };
  } catch (error) {
    console.warn('PostgreSQL content fallback to memory:', error);
    return { content: fallbackStore.content, source: 'memory' };
  }
}

export async function updateSiteContent(data: SiteContentInput) {
  try {
    const db = getPrisma() as any;
    if (!db || !db.siteContent) {
      fallbackStore.content = { ...fallbackStore.content, ...data };
      return { success: true, content: fallbackStore.content, source: 'memory' };
    }

    const content = await db.siteContent.upsert({
      where: { id: 'main_site_content' },
      update: { ...data },
      create: { id: 'main_site_content', ...data },
    });

    return { success: true, content: { ...fallbackStore.content, ...content }, source: 'postgresql' };
  } catch (error) {
    console.warn('PostgreSQL content update fallback:', error);
    fallbackStore.content = { ...fallbackStore.content, ...data };
    return { success: true, content: fallbackStore.content, source: 'memory' };
  }
}

export async function saveBooking(data: BookingInput) {
  try {
    const db = getPrisma() as any;
    if (!db || !db.mentee) throw new Error('Database client not initialized');

    let mentee = await db.mentee.findUnique({
      where: { email: data.email },
    });

    if (!mentee) {
      mentee = await db.mentee.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          currentRole: data.currentRole,
        },
      });
    }

    const booking = await db.booking.create({
      data: {
        menteeId: mentee.id,
        type: data.type,
        serviceName: data.serviceName,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        goals: data.goals,
        status: 'CONFIRMED',
      },
      include: {
        mentee: true,
      },
    });

    return { success: true, booking, source: 'postgresql' };
  } catch (error) {
    console.warn('PostgreSQL database fallback to memory:', error);

    const menteeId = `mentee_${Date.now()}`;
    const booking = {
      id: `bk_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      menteeId,
      mentee: {
        id: menteeId,
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        currentRole: data.currentRole || '',
      },
      type: data.type,
      serviceName: data.serviceName,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      goals: data.goals || '',
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    };

    fallbackStore.bookings.push(booking);
    return { success: true, booking, source: 'memory' };
  }
}

export async function saveServiceApplication(data: ServiceAppInput) {
  try {
    const db = getPrisma() as any;
    if (!db || !db.mentee) throw new Error('Database client not initialized');

    let mentee = await db.mentee.findUnique({
      where: { email: data.email },
    });

    if (!mentee) {
      mentee = await db.mentee.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          currentRole: data.currentRole,
          linkedinUrl: data.linkedinUrl,
        },
      });
    }

    const transactionId = data.transactionId || `gpay_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    const payment = await db.payment.create({
      data: {
        menteeId: mentee.id,
        amount: data.priceAmount,
        currency: 'INR',
        paymentMethod: 'GPAY',
        paymentToken: data.paymentToken || 'TEST_GPAY_TOKEN',
        transactionId,
        status: 'SUCCESS',
      },
    });

    const app = await db.serviceApplication.create({
      data: {
        menteeId: mentee.id,
        serviceTitle: data.serviceTitle,
        priceAmount: data.priceAmount,
        status: 'PAID',
        notes: data.notes,
        paymentId: payment.id,
      },
      include: {
        mentee: true,
        payment: true,
      },
    });

    return { success: true, application: app, transactionId, source: 'postgresql' };
  } catch (error) {
    console.warn('PostgreSQL database fallback for service app:', error);

    const transactionId = data.transactionId || `gpay_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const app = {
      id: `app_${Date.now()}`,
      mentee: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        currentRole: data.currentRole,
        linkedinUrl: data.linkedinUrl,
      },
      serviceTitle: data.serviceTitle,
      priceAmount: data.priceAmount,
      status: 'PAID',
      notes: data.notes,
      payment: {
        amount: data.priceAmount,
        currency: 'INR',
        paymentMethod: 'GPAY',
        transactionId,
        status: 'SUCCESS',
      },
      createdAt: new Date().toISOString(),
    };

    fallbackStore.serviceApps.push(app);
    return { success: true, application: app, transactionId, source: 'memory' };
  }
}

export async function saveContactMessage(data: ContactInput) {
  try {
    const db = getPrisma() as any;
    if (!db || !db.contactMessage) throw new Error('Database client not initialized');

    const contact = await db.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });
    return { success: true, contact, source: 'postgresql' };
  } catch (error) {
    console.warn('PostgreSQL fallback for contact:', error);
    const contact = {
      id: `msg_${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
    };
    fallbackStore.contacts.push(contact);
    return { success: true, contact, source: 'memory' };
  }
}

export async function getAllSubmissions() {
  try {
    const db = getPrisma() as any;
    if (!db || !db.booking) {
      return {
        bookings: fallbackStore.bookings,
        applications: fallbackStore.serviceApps,
        payments: fallbackStore.payments,
        contacts: fallbackStore.contacts,
        source: 'memory',
      };
    }

    const bookings = await db.booking.findMany({
      include: { mentee: true, payment: true },
      orderBy: { createdAt: 'desc' },
    });
    const applications = await db.serviceApplication.findMany({
      include: { mentee: true, payment: true },
      orderBy: { createdAt: 'desc' },
    });
    const payments = await db.payment.findMany({
      include: { mentee: true },
      orderBy: { createdAt: 'desc' },
    });
    const contacts = await db.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return {
      bookings,
      applications,
      payments,
      contacts,
      source: 'postgresql',
    };
  } catch (error) {
    return {
      bookings: fallbackStore.bookings,
      applications: fallbackStore.serviceApps,
      payments: fallbackStore.payments,
      contacts: fallbackStore.contacts,
      source: 'memory',
    };
  }
}
