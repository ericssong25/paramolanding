import React from 'react';
import { useI18n } from '../i18n';
import { Send, Phone } from 'lucide-react';

const WHATSAPP_NUM = '+56959843111';
const NETLIFY_NOTIFICATION_EMAIL = 'ericssongiannangeli@gmail.com';

const Contact: React.FC = () => {
  const { t } = useI18n();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // simple client-side validation with localized messages
    const get = (k: string) => (data.get(k) as string)?.trim() || '';
    const firstName = get('firstName');
    const lastName = get('lastName');
    const phone = get('phone');
    const email = get('email');
    const message = get('message');

    const emailPattern = /.+@.+\..+/;
    if (!firstName || !lastName || !phone || !email || !message) {
      alert(t('contact.validation.required'));
      return;
    }
    if (!emailPattern.test(email)) {
      alert(t('contact.validation.email'));
      return;
    }
    const payload = new URLSearchParams();
    data.forEach((value, key) => payload.append(key, String(value)));
    payload.set('form-name', 'contact');

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString(),
      });
      form.reset();
      window.location.href = '/gracias';
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al enviar. Intenta nuevamente.');
    }
  };

  const waHref = `https://wa.me/56${WHATSAPP_NUM.replace(/[^\d]/g, '').slice(-9)}?text=${encodeURIComponent('Hola, me gustaría hablar sobre un proyecto.')}`;

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-creato font-bold text-[#12173b] mb-3">{t('contact.title')}</h2>
          <p className="text-lg text-gray-600 font-garet">{t('contact.subtitle')}</p>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-6 md:p-8">
          <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>
            <div>
              <label className="block text-sm text-gray-700 mb-2">{t('contact.firstName')}</label>
              <input name="firstName" required className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7546ed]" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">{t('contact.lastName')}</label>
              <input name="lastName" required className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7546ed]" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">{t('contact.phone')}</label>
              <input name="phone" type="tel" required className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7546ed]" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">{t('contact.email')}</label>
              <input name="email" type="email" required className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7546ed]" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 mb-2">{t('contact.message')}</label>
              <textarea name="message" required rows={5} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7546ed]"></textarea>
            </div>
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button type="submit" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#7546ed] to-[#dc89ff] text-white px-6 py-3 rounded-full font-semibold hover:from-[#8b66ff] hover:to-[#f0a7ff] transition-colors">
                <Send className="w-4 h-4" /> {t('contact.submit')}
              </button>
              <a href={waHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#7546ed] text-[#7546ed] hover:bg-[#7546ed] hover:text-white transition-colors">
                <Phone className="w-4 h-4" /> {t('contact.whatsapp')}
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;


