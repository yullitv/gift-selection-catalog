export const FOOTER_COPY = {
  phone: "+1 (302) 555-0199",
  phoneHref: "tel:+13025550199",
  addressLine1: "16192 Coastal Highway",
  addressLine2: "Lewes, Delaware 19958, USA",
  copyright: `© ${new Date().getFullYear()} GIVHEART. All rights reserved.`,
  social: [
    {
      id: "facebook",
      label: "GIVHEART on Facebook",
      href: "https://www.facebook.com/share/18o1X7dyBd/?mibextid=wwXIfr",
      iconSrc: "/images/home/footer/FB_logo.png",
    },
    {
      id: "instagram",
      label: "GIVHEART on Instagram",
      href: "https://www.instagram.com/givheart_gifts?igsh=MXYzd2F0ODY3cHcy&utm_source=qr",
      iconSrc: "/images/home/footer/insta_logo.png",
    },
  ],
} as const;