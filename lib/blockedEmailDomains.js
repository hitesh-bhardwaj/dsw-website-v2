// Common free email domains that should be blocked from newsletter subscription
export const blockedEmailDomains = [
  // Gmail
  'gmail.com',
  'googlemail.com',

  // Yahoo
  'yahoo.com',
  'yahoo.co.uk',
  'yahoo.ca',
  'yahoo.com.au',
  'yahoo.in',
  'ymail.com',
  'rocketmail.com',

  // Outlook/Hotmail/Live
  'outlook.com',
  'outlook.co.uk',
  'hotmail.com',
  'hotmail.co.uk',
  'hotmail.fr',
  'hotmail.it',
  'hotmail.de',
  'hotmail.es',
  'live.com',
  'live.co.uk',
  'live.fr',
  'msn.com',

  // AOL
  'aol.com',
  'aol.co.uk',
  'aim.com',

  // iCloud/Apple
  'icloud.com',
  'me.com',
  'mac.com',

  // Proton
  'protonmail.com',
  'proton.me',
  'pm.me',

  // Other popular free email providers
  'mail.com',
  'email.com',
  'gmx.com',
  'gmx.net',
  'gmx.de',
  'zoho.com',
  'zohomail.com',
  'yandex.com',
  'yandex.ru',
  'rediffmail.com',

  // Temporary/Disposable email providers
  'mailinator.com',
  'guerrillamail.com',
  'temp-mail.org',
  '10minutemail.com',
  'throwaway.email',
  'tempmail.com',
  'maildrop.cc',
  'sharklasers.com',
  'guerrillamail.info',
  'grr.la',
  'guerrillamail.biz',
  'guerrillamail.de',
  'spam4.me',
  'mailnesia.com',
  'trashmail.com',
  'fakeinbox.com',
  'mytemp.email',
];

/**
 * Check if an email domain is blocked
 * @param {string} email - Email address to check
 * @returns {boolean} - True if domain is blocked
 */
export function isEmailDomainBlocked(email) {
  if (!email || typeof email !== 'string') {
    return true;
  }

  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) {
    return true;
  }

  return blockedEmailDomains.includes(domain);
}
