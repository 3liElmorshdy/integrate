import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import { postContactUs } from '../../api/contact';
import "./ContactUs.css";

const contactSchema = yup.object().shape({
  name: yup.string().required('fullNameRequired'),
  email: yup.string().email('invalidEmail').required('emailRequired'),
  phone: yup.string().matches(/^[0-9]+$/, 'phoneMustBeNumber').required('phoneRequired'),
  subject: yup.string().required('subjectRequired'),
  message: yup.string().required('messageRequired')
});

function ContactUS() {
  const { t, i18n } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm({
    resolver: yupResolver(contactSchema)
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await postContactUs({ ...data, lang: i18n.language === 'ar' ? 'ar' : 'en' });
      console.log("✅ Success response:", response); 
      setSubmitStatus('success');
      reset();
    } catch (error) {

      console.error(" Submission error:", error);

      if (error.response) {
   
        console.error("🔴 Error Response Data:", error.response.data);
        console.error("🔴 Error Response Status:", error.response.status);
        console.error("🔴 Error Response Headers:", error.response.headers);
      } else if (error.request) {
    
        console.error("🟡 No response received. Request was:", error.request);
      } else {

        console.error("⚠️ Error in setting up request:", error.message);
      }

      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section id="contact" className="contact-section">
      <div className="containerHero">
        <div className="wrapper__desc">
          <h2>{t('contactUs')}</h2>
          <p>{t('contactFormInfo')}</p>
        </div>
        
        {submitStatus === 'success' && (
          <div className="alert alert-success">
            {t('contactFormSuccess')}
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="alert alert-danger">
            {t('contactFormError')}
          </div>
        )}

        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="row gy-3">
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  placeholder={t('fullName')}
                  className={`form-control contact-input ${errors.name ? 'is-invalid' : ''}`}
                  {...register("name")}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && (
                  <div className="invalid-feedback">
                    {t(errors.name.message)}
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  placeholder={t('emailAddress')}
                  className={`form-control contact-input ${errors.email ? 'is-invalid' : ''}`}
                  {...register("email")}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <div className="invalid-feedback">
                    {t(errors.email.message)}
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="tel"
                  id="phone"
                  placeholder={t('phoneNumber')}
                  className={`form-control contact-input ${errors.phone ? 'is-invalid' : ''}`}
                  {...register("phone")}
                  aria-invalid={errors.phone ? "true" : "false"}
                />
                {errors.phone && (
                  <div className="invalid-feedback">
                    {t(errors.phone.message)}
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  id="subject"
                  placeholder={t('subject')}
                  className={`form-control contact-input ${errors.subject ? 'is-invalid' : ''}`}
                  {...register("subject")}
                  aria-invalid={errors.subject ? "true" : "false"}
                />
                {errors.subject && (
                  <div className="invalid-feedback">
                    {t(errors.subject.message)}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="form-group mt-3">
            <textarea 
              id="message"
              rows="4" 
              placeholder={t('message')}
              className={`form-control contact-textarea ${errors.message ? 'is-invalid' : ''}`}
              {...register("message")}
              aria-invalid={errors.message ? "true" : "false"}
            ></textarea>
            {errors.message && (
              <div className="invalid-feedback">
                {t(errors.message.message)}
              </div>
            )}
          </div>
          
          <div className="text-center mt-4">
            <button 
              type="submit" 
              className="btn-handel btn-contact"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className="ms-2">{t('sending')}</span>
                </>
              ) : (
                t('send')
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactUS;