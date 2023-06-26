import {
  AppLogo,
  ContactsLogo1,
  ContactsLogo2,
  HomeWrapper,
} from './HomeIconAnime.styled';

export const HomeIconAnime = () => {
  return (
    <HomeWrapper>
      <AppLogo>
        <ContactsLogo1 size="200px" />
        <ContactsLogo2 size="200px" />
      </AppLogo>
    </HomeWrapper>
  );
};
