export var AlertPlatform;
(function (AlertPlatform) {
    AlertPlatform["SMS"] = "sms";
    AlertPlatform["FACEBOOK"] = "facebook";
    AlertPlatform["TWITTER"] = "twitter";
    AlertPlatform["EMAIL"] = "email";
})(AlertPlatform || (AlertPlatform = {}));
export const allPlatforms = [
    AlertPlatform.SMS,
    AlertPlatform.FACEBOOK,
    AlertPlatform.EMAIL,
    AlertPlatform.TWITTER,
];
//# sourceMappingURL=platform.js.map