"use strict";

/*
|--------------------------------------------------------------------------
| تنظیمات اصلی
|--------------------------------------------------------------------------
| فقط اطلاعات این قسمت را تغییر بده.
*/

const contactConfig = {
  businessName: "محمدحسین سماواتیان",

  description: "طراحی و توسعه وب‌سایت و اپلیکیشن",

  /*
   * آدرس لوگو را وارد کن.
   * نمونه:
   * logoUrl: "../images/logo.png"
   *
   * اگر خالی باشد، حروف CS نمایش داده می‌شود.
   */
  logoUrl: "",

  /*
   * آدرس کامل سایت
   */
  websiteUrl: "../index.html",

  /*
   * شماره نمایشی
   */
  displayPhone: "09012844665",

  /*
   * شماره تماس با فرمت بین‌المللی
   */
  internationalPhone: "+989012844665",

  /*
   * شماره واتساپ بدون علامت +
   */
  whatsappPhone: "989012844665",

  /*
   * متن آماده واتساپ
   */
  whatsappMessage: "سلام، وقت بخیر نیاز به مشاوره دارم.",

  /*
   * نام کاربری تلگرام، بدون @
   */
  telegramUsername: "Samavatian_Tech",

  /*
   * نام کاربری ایتا، بدون @
   */
  eitaaUsername: "",

  /*
   * مشخصات فایل مخاطب
   */
  contact: {
    firstName: "محمدحسین",
    // lastName: "Store",
    lastName: "سماواتیان",
    jobTitle: "طراحی و توسعه وب‌سایت و اپلیکیشن",
    email: "",
    website: new URL("../index.html", window.location.href).href,
  },

  footerText: "تمامی راه‌های ارتباطی رسمی مجموعه",
};

/*
|--------------------------------------------------------------------------
| دریافت عناصر صفحه
|--------------------------------------------------------------------------
*/

const elements = {
  businessName: document.getElementById("businessName"),
  businessDescription: document.getElementById("businessDescription"),

  businessLogo: document.getElementById("businessLogo"),
  logoPlaceholder: document.getElementById("logoPlaceholder"),

  websiteButton: document.getElementById("websiteButton"),
  saveContactButton: document.getElementById("saveContactButton"),
  callButton: document.getElementById("callButton"),
  smsButton: document.getElementById("smsButton"),
  whatsappButton: document.getElementById("whatsappButton"),
  eitaaButton: document.getElementById("eitaaButton"),
  telegramButton: document.getElementById("telegramButton"),

  footerText: document.getElementById("footerText"),
  toast: document.getElementById("toast"),
};

/*
|--------------------------------------------------------------------------
| توابع کمکی
|--------------------------------------------------------------------------
*/

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");

  window.clearTimeout(showToast.timeoutId);

  showToast.timeoutId = window.setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 2800);
}

function escapeVCardValue(value = "") {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

function createVCard() {
  const { firstName, lastName, organization, jobTitle, email, website } =
    contactConfig.contact;

  const vCardData = [
    "BEGIN:VCARD",
    "VERSION:3.0",

    `N:${escapeVCardValue(lastName)};${escapeVCardValue(firstName)};;;`,

    `FN:${escapeVCardValue(`${firstName} ${lastName}`.trim())}`,

    `ORG:${escapeVCardValue(organization)}`,
    `TITLE:${escapeVCardValue(jobTitle)}`,

    `TEL;TYPE=CELL:${escapeVCardValue(contactConfig.internationalPhone)}`,

    `EMAIL;TYPE=INTERNET:${escapeVCardValue(email)}`,
    `URL:${escapeVCardValue(website)}`,

    "END:VCARD",
  ].join("\r\n");

  const blob = new Blob([vCardData], {
    type: "text/vcard;charset=utf-8",
  });

  const downloadUrl = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");

  downloadLink.href = downloadUrl;
  downloadLink.download = "Samavatian.vcf";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();

  window.setTimeout(() => {
    URL.revokeObjectURL(downloadUrl);
  }, 1000);

  showToast("فایل مخاطب آماده شد؛ آن را باز و ذخیره کنید.");
}

/*
|--------------------------------------------------------------------------
| تنظیم اطلاعات صفحه
|--------------------------------------------------------------------------
*/

function initializeContactPage() {
  document.title = `راه‌های ارتباطی | ${contactConfig.businessName}`;

  elements.businessName.textContent = contactConfig.businessName;

  elements.businessDescription.textContent = contactConfig.description;

  elements.footerText.textContent = contactConfig.footerText;

  /*
   * نمایش لوگو
   */
  if (contactConfig.logoUrl.trim()) {
    elements.businessLogo.src = contactConfig.logoUrl;
    elements.businessLogo.hidden = false;
    elements.logoPlaceholder.hidden = true;
  }

  /*
   * وب‌سایت
   */
  elements.websiteButton.href = contactConfig.websiteUrl;

  /*
   * تماس
   */
  elements.callButton.href = `tel:${contactConfig.internationalPhone}`;

  /*
   * پیامک
   *
   * برای سازگاری بهتر، فقط شماره را باز می‌کنیم.
   */
  elements.smsButton.href = `sms:${contactConfig.internationalPhone}`;

  /*
   * واتساپ
   */
  const encodedWhatsappMessage = encodeURIComponent(
    contactConfig.whatsappMessage,
  );

  elements.whatsappButton.href =
    `https://wa.me/${contactConfig.whatsappPhone}` +
    `?text=${encodedWhatsappMessage}`;

  /*
   * تلگرام
   */
  if (contactConfig.telegramUsername) elements.telegramButton.href = `https://t.me/${contactConfig.telegramUsername}`;
  else elements.telegramButton.hidden = true;

  /*
   * ایتا
   */
  if (contactConfig.eitaaUsername) elements.eitaaButton.href = `https://eitaa.com/${contactConfig.eitaaUsername}`;
  else elements.eitaaButton.hidden = true;

  /*
   * ذخیره مخاطب
   */
  elements.saveContactButton.addEventListener("click", createVCard);
}

document.addEventListener("DOMContentLoaded", initializeContactPage);


