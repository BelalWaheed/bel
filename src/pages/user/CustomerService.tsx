import { useState } from "react";
import { FaChevronDown, FaShippingFast, FaUndo, FaFileContract, FaShieldAlt, FaQuestionCircle } from "react-icons/fa";
import { useTranslation } from "@/hooks/useTranslation";

interface FAQItem {
  question: string;
  answer: string;
}

const AccordionItem = ({ question, answer, isOpen, onClick }: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onClick: () => void;
}) => (
  <div className="border-b border-border last:border-0">
    <button
      onClick={onClick}
      className="w-full py-5 flex items-center justify-between text-start gap-4 hover:text-primary transition-colors"
    >
      <span className="font-medium text-foreground">{question}</span>
      <FaChevronDown className={`text-muted-foreground shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}>
      <p className="text-muted-foreground leading-relaxed">{answer}</p>
    </div>
  </div>
);

export default function CustomerService() {
  const { t } = useTranslation();
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqItems: FAQItem[] = [
    {
      question: t("customerService.faq1Q"),
      answer: t("customerService.faq1A"),
    },
    {
      question: t("customerService.faq2Q"),
      answer: t("customerService.faq2A"),
    },
    {
      question: t("customerService.faq3Q"),
      answer: t("customerService.faq3A"),
    },
    {
      question: t("customerService.faq4Q"),
      answer: t("customerService.faq4A"),
    },
    {
      question: t("customerService.faq5Q"),
      answer: t("customerService.faq5A"),
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t("customerService.title")}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("customerService.subtitle")}
          </p>
        </div>

        {/* FAQ Section */}
        <section id="faq" className="mb-12">
          <div className="card-premium p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white">
                <FaQuestionCircle className="text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">{t("customerService.faqTitle")}</h2>
            </div>
            <div className="divide-y divide-border">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openFAQ === index}
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Shipping & Returns Section */}
        <section id="shipping" className="mb-12">
          <div className="card-premium p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white">
                <FaShippingFast className="text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">{t("customerService.shippingTitle")}</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                  <FaShippingFast className="text-primary" />
                  {t("customerService.shippingPolicy")}
                </h3>
                <ul className="text-muted-foreground space-y-2 list-disc list-inside">
                  <li>{t("customerService.shipping1")}</li>
                  <li>{t("customerService.shipping2")}</li>
                  <li>{t("customerService.shipping3")}</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                  <FaUndo className="text-primary" />
                  {t("customerService.returnsPolicy")}
                </h3>
                <ul className="text-muted-foreground space-y-2 list-disc list-inside">
                  <li>{t("customerService.returns1")}</li>
                  <li>{t("customerService.returns2")}</li>
                  <li>{t("customerService.returns3")}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Terms & Conditions Section */}
        <section id="terms" className="mb-12">
          <div className="card-premium p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white">
                <FaFileContract className="text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">{t("customerService.termsTitle")}</h2>
            </div>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("customerService.termsIntro")}
              </p>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="text-foreground font-semibold mb-1">{t("customerService.terms1Title")}</h3>
                  <p>{t("customerService.terms1Text")}</p>
                </div>
                <div>
                  <h3 className="text-foreground font-semibold mb-1">{t("customerService.terms2Title")}</h3>
                  <p>{t("customerService.terms2Text")}</p>
                </div>
                <div>
                  <h3 className="text-foreground font-semibold mb-1">{t("customerService.terms3Title")}</h3>
                  <p>{t("customerService.terms3Text")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Policy Section */}
        <section id="privacy" className="mb-12">
          <div className="card-premium p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white">
                <FaShieldAlt className="text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">{t("customerService.privacyTitle")}</h2>
            </div>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("customerService.privacyIntro")}
              </p>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="text-foreground font-semibold mb-1">{t("customerService.privacy1Title")}</h3>
                  <p>{t("customerService.privacy1Text")}</p>
                </div>
                <div>
                  <h3 className="text-foreground font-semibold mb-1">{t("customerService.privacy2Title")}</h3>
                  <p>{t("customerService.privacy2Text")}</p>
                </div>
                <div>
                  <h3 className="text-foreground font-semibold mb-1">{t("customerService.privacy3Title")}</h3>
                  <p>{t("customerService.privacy3Text")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
