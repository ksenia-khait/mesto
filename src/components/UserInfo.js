export default class UserInfo {
    constructor({userNameSelector, userInfoSelector, avatarSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
        this._avatar = document.querySelector(avatarSelector);

    }

    getUserInfo() {
        return {
            title: this._userName.textContent,
            capture: this._userInfo.textContent,
            url: this._userInfo.src
        }
    }

    setUserInfo(userName, userInfo) {
        this._userName.textContent = userName;
        this._userInfo.textContent = userInfo;

    }

    setAvatar(avatar) {
        this._avatar.style.backgroundImage = `url(${avatar})`;
    }

}