// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  HeaderHRM: {
    ContentType: 'application/json',
    ApiType: 'hrm',
    FunctionIDLogin: 'Login',
    ApplicationID: 'HrmMobileWeb',
    ApiUrl: 'core/authentication/login',
  },

  API: 'http://localhost/HrmMobileWebWS/ApiHandler/Call',
  // API: 'http://113.161.108.195:8080/mobileapi/api/auth/login',
  PageSize: 20,

  Button: {
    Cancel: 'Hủy',
    OK: 'Đồng ý',
    Choose: 'Chọn',
    ClearFilter: 'Bỏ lọc'
  },
  Notification: {
    TitleAlert: 'Cảnh Báo',
    DataNotFound: 'Không có dữ liệu !!!'
  },

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
