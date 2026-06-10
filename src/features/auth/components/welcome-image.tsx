const SIGN_IN_IMAGE_URL =
  "https://s3.twcstorage.ru/genario-public-s3-storage/images/illustrations/sign-in-image";

export const WelcomeImage = () => {
  return (
    <img
      src={SIGN_IN_IMAGE_URL}
      alt="Картинка страницы входа"
      className="rounded-4 h-full w-full flex-1 object-cover"
    />
  );
};
