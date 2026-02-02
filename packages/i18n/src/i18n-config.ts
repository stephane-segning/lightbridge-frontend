import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      app: {
        brand: 'Self-Service',
      },
      login: {
        title: 'Login',
        description: "Connect with your organization's SSO provider to continue.",
        sso: 'Continue with SSO',
        ssoLoading: 'Opening SSO...',
      },
      apiKeys: {
        title: 'API Keys',
        subtitle: 'Manage keys used by your services.',
        new: 'New key',
        edit: 'Edit',
        delete: 'Delete',
        keyLabel: 'Key name',
        placeholder: 'Production',
        save: 'Save key',
        saving: 'Saving...',
        createTitle: 'Create or Update',
      },
      usage: {
        title: 'Token Usage',
        tokens: '{{formatted}} tokens',
        requests: '{{formatted}} requests',
      },
      deleteKey: {
        title: 'Delete API key',
        description: 'You are about to delete \"{{name}}\". This action cannot be undone.',
        cancel: 'Cancel',
        confirm: 'Delete',
        deleting: 'Deleting...',
      },
      nav: {
        login: 'Login',
        apiKeys: 'API Keys',
        apiKeyEditor: 'Create Key',
        usage: 'Usage',
      },
    },
  },
};

export function initI18n(locale: string) {
  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      resources,
      lng: locale,
      fallbackLng: 'en',
      returnNull: false,
      interpolation: {
        escapeValue: false,
      },
    });

    return i18n;
  }

  if (locale && i18n.language !== locale) {
    i18n.changeLanguage(locale);
  }

  return i18n;
}

export async function setLocale(locale: string) {
  if (!i18n.isInitialized) {
    initI18n(locale);
    return;
  }

  await i18n.changeLanguage(locale);
}

export { i18n };
