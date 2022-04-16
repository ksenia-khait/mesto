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
            avatar: this._avatar.src
        }
    }

    setUserInfo(userName, userInfo, avatarURL) {
        this._userName.textContent = userName;
        this._userInfo.textContent = userInfo;
        this._avatar.style.backgroundImage = `url(${avatarURL})`;
    }

}

