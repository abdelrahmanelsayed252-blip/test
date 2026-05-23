'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Check, ChevronDown, ExternalLink, Upload } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Link, useRouter } from '@/i18n/routing';
import { cn, formatPrice } from '@/lib/utils';
import { SectionLabel } from './SectionLabel';

type Step = 0 | 1 | 2 | 3;
type ShippingMethod = 'bosta' | 'egyptianPost' | 'aramex';
type PaymentMethod = 'cod' | 'instapay' | 'vodafoneCash';

const GOVERNORATE_KEYS = [
  'cairo',
  'giza',
  'alexandria',
  'qalyubia',
  'sharqia',
  'dakahlia',
  'beheira',
  'kafrElSheikh',
  'gharbia',
  'monufia',
  'damietta',
  'portSaid',
  'ismailia',
  'suez',
  'fayoum',
  'beniSuef',
  'minya',
  'asyut',
  'sohag',
  'qena',
  'luxor',
  'aswan',
  'redSea',
  'newValley',
  'matrouh'
] as const;

const SHIPPING_FEE = 70;

export function CheckoutClient() {
  const locale = useLocale() as 'en' | 'ar';
  const t = useTranslations('checkout');
  const tg = useTranslations('governorates');
  const tc = useTranslations('common');
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [step, setStep] = useState<Step>(0);

  // info
  const [info, setInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    building: '',
    apartment: '',
    governorate: ''
  });

  // shipping
  const [shipping, setShipping] = useState<ShippingMethod>('bosta');

  // payment
  const [payment, setPayment] = useState<PaymentMethod>('cod');
  const [reference, setReference] = useState('');
  const [screenshotName, setScreenshotName] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const total = subtotal + (items.length > 0 ? SHIPPING_FEE : 0);

  const steps = useMemo(
    () => [
      { key: 'info', label: t('steps.info') },
      { key: 'shipping', label: t('steps.shipping') },
      { key: 'payment', label: t('steps.payment') },
      { key: 'review', label: t('steps.review') }
    ],
    [t]
  );

  const infoValid =
    info.fullName.trim() &&
    info.phone.trim() &&
    info.address.trim() &&
    info.building.trim() &&
    info.governorate.trim();

  const paymentValid =
    payment === 'cod' ||
    (payment === 'instapay' && (reference.trim() || screenshotName)) ||
    (payment === 'vodafoneCash' && (reference.trim() || screenshotName));

  if (items.length === 0) {
    return (
      <div className="px-5 md:px-10 pt-10 md:pt-16 pb-24 max-w-md mx-auto text-center space-y-6">
        <div className="text-3xl md:text-5xl font-extrabold editorial">
          {locale === 'ar' ? 'سلتك هادية.' : 'Your cart is quiet.'}
        </div>
        <Link href="/shop" className="btn-primary inline-flex">
          {locale === 'ar' ? 'إكمال التسوق' : 'Continue Shopping'}
        </Link>
      </div>
    );
  }

  function next() {
    if (step === 0 && !infoValid) return;
    if (step === 2 && !paymentValid) return;
    setStep((s) => (s + 1) as Step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function back() {
    setStep((s) => Math.max(0, s - 1) as Step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function placeOrder() {
    if (!agreed) return;
    setSubmitting(true);
    const orderNumber = `RAW-${Date.now().toString(36).toUpperCase()}`;
    try {
      sessionStorage.setItem(
        'raw-last-order',
        JSON.stringify({
          orderNumber,
          info,
          shipping,
          payment,
          items,
          subtotal,
          shippingFee: SHIPPING_FEE,
          total
        })
      );
    } catch {}
    clearCart();
    setTimeout(() => router.push('/order-confirmed'), 400);
  }

  return (
    <div className="px-5 md:px-10 pt-10 md:pt-16 pb-24">
      <div className="space-y-3 mb-10">
        <SectionLabel label={t('title')} />
        <h1 className="text-4xl md:text-6xl font-extrabold editorial">
          {t('title')}.
        </h1>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-1 md:gap-3 mb-10 md:mb-14 overflow-x-auto no-scrollbar">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2 md:gap-3 shrink-0">
            <div
              className={cn(
                'w-7 h-7 md:w-8 md:h-8 flex items-center justify-center border text-xs font-bold tabular-nums transition-all',
                i < step && 'bg-brand-blue text-white border-brand-blue',
                i === step && 'border-brand-blue text-brand-blue',
                i > step && 'border-[var(--border)] opacity-60'
              )}
            >
              {i < step ? <Check size={12} strokeWidth={2.5} /> : i + 1}
            </div>
            <div
              className={cn(
                'text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold whitespace-nowrap',
                i === step ? 'opacity-100' : 'opacity-60'
              )}
            >
              {s.label}
            </div>
            {i < steps.length - 1 && (
              <div className="w-6 md:w-12 h-px bg-[var(--border)]" />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 0 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Field
                      label={t('fullName')}
                      value={info.fullName}
                      onChange={(v) => setInfo({ ...info, fullName: v })}
                      required
                    />
                    <Field
                      label={t('phone')}
                      value={info.phone}
                      onChange={(v) => setInfo({ ...info, phone: v })}
                      type="tel"
                      required
                    />
                  </div>
                  <Field
                    label={t('email')}
                    value={info.email}
                    onChange={(v) => setInfo({ ...info, email: v })}
                    type="email"
                  />
                  <Field
                    label={t('address')}
                    value={info.address}
                    onChange={(v) => setInfo({ ...info, address: v })}
                    required
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Field
                      label={t('building')}
                      value={info.building}
                      onChange={(v) => setInfo({ ...info, building: v })}
                      required
                    />
                    <Field
                      label={t('apartment')}
                      value={info.apartment}
                      onChange={(v) => setInfo({ ...info, apartment: v })}
                    />
                  </div>
                  <div>
                    <label className="section-label opacity-60 mb-2 block">
                      {t('governorate')}{' '}
                      <span className="text-brand-blue">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={info.governorate}
                        onChange={(e) =>
                          setInfo({ ...info, governorate: e.target.value })
                        }
                        className="appearance-none pr-10"
                      >
                        <option value="">{t('selectGovernorate')}</option>
                        {GOVERNORATE_KEYS.map((k) => (
                          <option key={k} value={k}>
                            {tg(k)}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        strokeWidth={1.5}
                        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none rtl:left-3 rtl:right-auto"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={!infoValid}
                    onClick={next}
                    className={cn(
                      'btn-primary mt-4',
                      !infoValid && 'opacity-40 cursor-not-allowed'
                    )}
                  >
                    {t('continueShipping')}
                  </button>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-3">
                  {(['bosta', 'egyptianPost', 'aramex'] as ShippingMethod[]).map(
                    (m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setShipping(m)}
                        className={cn(
                          'w-full border p-5 flex items-center justify-between text-start transition-colors',
                          shipping === m
                            ? 'border-brand-blue'
                            : 'border-[var(--border)]'
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className={cn(
                              'w-4 h-4 rounded-full border-2 flex items-center justify-center',
                              shipping === m
                                ? 'border-brand-blue'
                                : 'border-[var(--border)]'
                            )}
                          >
                            {shipping === m && (
                              <span className="w-2 h-2 rounded-full bg-brand-blue" />
                            )}
                          </span>
                          <div>
                            <div className="font-bold">{t(m)}</div>
                            <div className="text-xs opacity-60 mt-0.5">
                              {t('deliveryDays')}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-bold">{t('shippingFee')}</div>
                      </button>
                    )
                  )}
                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={back}
                      className="btn-outline"
                    >
                      {t('back')}
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      className="btn-primary"
                    >
                      {t('continuePayment')}
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  {(
                    [
                      { id: 'cod', desc: t('codDesc') },
                      { id: 'instapay', desc: t('instapayDesc') },
                      { id: 'vodafoneCash', desc: t('vodafoneCashDesc') }
                    ] as { id: PaymentMethod; desc: string }[]
                  ).map((m) => (
                    <div
                      key={m.id}
                      className={cn(
                        'border transition-colors',
                        payment === m.id
                          ? 'border-brand-blue'
                          : 'border-[var(--border)]'
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setPayment(m.id)}
                        className="w-full p-5 flex items-start gap-4 text-start"
                      >
                        <span
                          className={cn(
                            'mt-1 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0',
                            payment === m.id
                              ? 'border-brand-blue'
                              : 'border-[var(--border)]'
                          )}
                        >
                          {payment === m.id && (
                            <span className="w-2 h-2 rounded-full bg-brand-blue" />
                          )}
                        </span>
                        <div>
                          <div className="font-bold">{t(m.id)}</div>
                          <div className="text-xs opacity-60 mt-1">
                            {m.desc}
                          </div>
                        </div>
                      </button>

                      {payment === m.id && m.id !== 'cod' && (
                        <div className="px-5 pb-5 space-y-4">
                          {m.id === 'instapay' && (
                            <a
                              href="https://ipn.eg/S/raanaa11/instapay/25kFMl"
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-brand-blue hover:opacity-60"
                            >
                              <ExternalLink size={14} strokeWidth={1.5} />
                              {t('instapayLink')}
                            </a>
                          )}
                          <Field
                            label={t('reference')}
                            value={reference}
                            onChange={setReference}
                          />
                          <div>
                            <label className="section-label opacity-60 mb-2 block">
                              {t('uploadScreenshot')}
                            </label>
                            <label className="border border-[var(--border)] border-dashed p-5 flex items-center justify-center gap-3 cursor-pointer hover:border-brand-blue transition-colors">
                              <Upload size={16} strokeWidth={1.5} />
                              <span className="text-sm opacity-80">
                                {screenshotName ?? t('uploadScreenshot')}
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const f = e.target.files?.[0];
                                  if (f) setScreenshotName(f.name);
                                }}
                              />
                            </label>
                            {screenshotName && (
                              <div className="mt-2 text-xs text-brand-blue flex items-center gap-1.5">
                                <Check size={12} strokeWidth={2.5} />
                                {t('uploaded')}: {screenshotName}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={back}
                      className="btn-outline"
                    >
                      {t('back')}
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      disabled={!paymentValid}
                      className={cn(
                        'btn-primary',
                        !paymentValid && 'opacity-40 cursor-not-allowed'
                      )}
                    >
                      {t('continueReview')}
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <ReviewBlock
                    title={t('steps.info')}
                    onEdit={() => setStep(0)}
                  >
                    <div className="space-y-1 text-sm">
                      <div>{info.fullName}</div>
                      <div className="opacity-70">{info.phone}</div>
                      {info.email && (
                        <div className="opacity-70">{info.email}</div>
                      )}
                      <div className="opacity-70">
                        {info.address}, {t('building')} {info.building}
                        {info.apartment && `, ${t('apartment')} ${info.apartment}`}
                      </div>
                      <div className="opacity-70">
                        {tg(info.governorate as never)}
                      </div>
                    </div>
                  </ReviewBlock>
                  <ReviewBlock
                    title={t('steps.shipping')}
                    onEdit={() => setStep(1)}
                  >
                    <div className="text-sm">
                      <div className="font-bold">{t(shipping)}</div>
                      <div className="opacity-70">
                        {t('deliveryDays')} · {t('shippingFee')}
                      </div>
                    </div>
                  </ReviewBlock>
                  <ReviewBlock
                    title={t('steps.payment')}
                    onEdit={() => setStep(2)}
                  >
                    <div className="text-sm">
                      <div className="font-bold">{t(payment)}</div>
                      {reference && (
                        <div className="opacity-70 mt-1">
                          {t('reference')}: {reference}
                        </div>
                      )}
                      {screenshotName && (
                        <div className="opacity-70 mt-1 flex items-center gap-1.5">
                          <Check size={12} strokeWidth={2.5} />
                          {screenshotName}
                        </div>
                      )}
                    </div>
                  </ReviewBlock>

                  <label className="flex items-start gap-3 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="!w-auto !p-0 mt-1 accent-brand-blue"
                    />
                    <span className="opacity-80">{t('agree')}</span>
                  </label>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={back}
                      className="btn-outline"
                    >
                      {t('back')}
                    </button>
                    <button
                      type="button"
                      onClick={placeOrder}
                      disabled={!agreed || submitting}
                      className={cn(
                        'btn-primary',
                        (!agreed || submitting) &&
                          'opacity-40 cursor-not-allowed'
                      )}
                    >
                      {t('placeOrder')}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-28 self-start border border-[var(--border)] p-6 space-y-5">
          <div className="section-label opacity-60">{t('summary')}</div>
          <div className="space-y-4 max-h-96 overflow-y-auto -mx-2 px-2">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="flex gap-3"
              >
                <div className="relative w-16 h-20 flex-shrink-0 bg-[var(--border)] overflow-hidden">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-blue text-white text-[10px] font-bold flex items-center justify-center">
                    {item.quantity}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold truncate">
                    {item.name[locale]}
                  </div>
                  <div className="text-[11px] opacity-60 mt-0.5">
                    {item.subtitle[locale]} · {item.size}
                  </div>
                </div>
                <div className="text-xs font-bold whitespace-nowrap tabular-nums">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[var(--border)] pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="opacity-60">{t('orderSubtotal')}</span>
              <span className="tabular-nums">
                {formatPrice(subtotal)} {tc('currency')}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="opacity-60">{t('orderShipping')}</span>
              <span className="tabular-nums">
                {formatPrice(SHIPPING_FEE)} {tc('currency')}
              </span>
            </div>
            <div className="border-t border-[var(--border)] pt-3 mt-3 flex justify-between text-base font-bold">
              <span>{t('orderTotal')}</span>
              <span className="tabular-nums">
                {formatPrice(total)} {tc('currency')}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required = false
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="section-label opacity-60 mb-2 block">
        {label} {required && <span className="text-brand-blue">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
}

function ReviewBlock({
  title,
  onEdit,
  children
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-[var(--border)] p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="section-label opacity-60">{title}</div>
        <button
          type="button"
          onClick={onEdit}
          className="text-[10px] tracking-[0.2em] uppercase font-bold text-brand-blue hover:opacity-60"
        >
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}
