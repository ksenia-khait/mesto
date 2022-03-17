export default class UserInfo {
    constructor({userNameSelector, userInfoSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
    }

    getUserInfo() {
        return {
            title: this._userName.textContent,
            capture: this._userInfo.textContent
        }
    }

    setUserInfo(userName, userInfo) {
        this._userName.textContent = userName;
        this._userInfo.textContent = userInfo;
    }
}