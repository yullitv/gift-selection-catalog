export const FOOTER_COPY = {
  phone: "+38 (044) 287-45-12",
  phoneHref: "tel:+380442874512",
  addressLine1: "Kyiv, Ukraine",
  addressLine2: "18 Khreshchatyk St., office 4",
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
