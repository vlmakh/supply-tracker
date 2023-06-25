import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en: {
    translation: {
      lang: 'en-US',
      title: {
        home: 'Home',
        trending: 'Trending today',
        library: 'Favorite movies',
        photoalbum: 'Favorite actors',
        error: 'Error',
      },
      userMenu: {
        logout: 'Logout',
      },
      buttons: {
        login: 'Login',
        signup: 'Register',
        add: 'Add task',
        save: 'Save Task',
        wait: 'Please wait...',
        updateName: 'Update Name',
        updatePass: 'Update Pass',
        apply: 'Apply',
      },
      account: {
        changePass: 'Change password',
        changeName: 'Change name',
        changeLang: 'Change language',
        repeatPass: 'Repeat new password',
      },
      notFoundMsg: 'No information added',
    },
  },
  uk: {
    translation: {
      lang: 'uk-UA',
      title: {
        home: 'Домашня',
        trending: 'Популярні сьогодні',
        library: 'Улюблені фільми',
        photoalbum: 'Улюблені актори',
        error: 'Помилка',
      },
      userMenu: {
        logout: 'Вийти',
      },
      buttons: {
        login: 'Увійти',
        signup: 'Зареєструватися',
        add: 'Додати таску',
        save: 'Зберегти',
        wait: 'Please wait...',
        updateName: "Оновити Ім'я",
        updatePass: 'Оновити пароль',
        apply: 'Застосувати',
      },
      account: {
        changePass: 'Змінити пароль',
        changeName: "Змінити Ім'я",
        changeLang: 'Змінити мову',
        repeatPass: 'Повторити новий пароль',
      },
      notFoundMsg: 'Немає інформації',
    },
  },
};

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  detection: {
    order: ['queryString', 'cookie'],
    cache: ['cookie'],
  },
  interpolation: {
    escapeValue: false,
  },
  resources,
});

export default i18n;
