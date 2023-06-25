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
        update: 'Update',
      },
      login: {
        login: 'Login',
        signup: 'Registration',
        pass: 'password',
        rePass: 're-password',
        name: 'Name',
        passMustMatch: 'Passwords must match',
      },
      account: {
        toTasks: 'Back to tasks',
        changePass: 'Change password',
        changeName: 'Change name',
        changeLang: 'Change language',
        newName: 'new Name',
        newPass: 'new password',
        repeatNewPass: 'repeat new password',
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
        wait: 'Зачекайте...',
        update: 'Оновити',
      },
      login: {
        login: 'Вхід',
        signup: 'Реєстрація',
        pass: 'пароль',
        rePass: 'повтор паролю',
        name: "Ім'я",
        passMustMatch: 'Паролі мають співпадати',
      },
      account: {
        toTasks: 'Назад до задач',
        changePass: 'Змінити пароль',
        changeName: "Змінити Ім'я",
        changeLang: 'Змінити мову',
        newName: "нове Ім'я",
        newPass: 'новий пароль',
        repeatNewPass: 'повторити новий пароль',
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
