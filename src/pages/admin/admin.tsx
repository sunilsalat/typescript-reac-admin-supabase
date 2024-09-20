import {
  Admin,
  CustomRoutes,
  Resource,
  localStorageStore,
  useStore,
} from "react-admin";
import { dataProvider } from "../../utils/dataProvider";
import { authProvider } from "../../utils/authProvider";
import Layout from "./layout/layout";
import MyError from "./customError";
import { themes } from "./themes/themes";
import { ForgotPasswordPage, LoginPage, SetPasswordPage } from "ra-supabase";
import { Route } from "react-router-dom";
import PressReleases from "./pressReleases";
import Products from "./products";
import Reviews from "./reviews";
import Nations from "./settings/nations";
import Hotel from "./property/hotel";
import GroupedProducts from "./groupedProducts";
import Medias from "./medias";
import Address from "./address";
import BookingLinks from "./property/bookingLinks";
import SocialLinks from "./property/socialLinks";
import { useEffect } from "react";
import PropertyNominationCategories from "./property/nominationCategories";
import WinnersLIst from "./property/winnersLIst";
import { supabase } from "../../db/supabase";

const store = localStorageStore(undefined, "ECommerce");

function MyAdmin() {
  const [themeName] = useStore<string>("themeName", "soft");
  const lightTheme = themes.find(
    (theme: any) => theme.name === themeName
  )?.light;
  const darkTheme = themes.find((theme: any) => theme.name === themeName)?.dark;

  useEffect(() => {
    // async function fetchData() {
    //   console.log("sdfsdf");
    //   const { data } = await supabase.auth.signUp({
    //     email: "user@yopmail.com",
    //     password: "secret",
    //     options: {
    //       data: {
    //         first_name: "doe",
    //         age: 27,
    //         role: "user",
    //       },
    //     },
    //   });
    // }
    // fetchData();
  }, []);

  return (
    <Admin
      basename="/admin"
      dataProvider={dataProvider}
      authProvider={authProvider}
      requireAuth
      loginPage={LoginPage}
      // error={MyError}
      store={store}
      lightTheme={lightTheme}
      darkTheme={darkTheme}
      defaultTheme="light"
      layout={Layout}
      disableTelemetry
    >
      <CustomRoutes noLayout>
        <Route path={SetPasswordPage.path} element={<SetPasswordPage />} />
        <Route
          path={ForgotPasswordPage.path}
          element={<ForgotPasswordPage />}
        />
      </CustomRoutes>
      <Resource name="press_releases" {...PressReleases} />
      <Resource name="products" {...Products} />
      <Resource name="reviews" {...Reviews} />
      <Resource name="nations" {...Nations} />
      <Resource name="hotel" {...Hotel} />
      <Resource name="grouped_products" {...GroupedProducts} />
      <Resource name="currencies" />
      <Resource name="addresses" {...Address} />
      <Resource name="media" {...Medias} />
      <Resource name="properties_booking_links" {...BookingLinks} />
      <Resource name="properties_social_links" {...SocialLinks} />
      <Resource name="properties_winners" {...WinnersLIst} />
      <Resource
        name="properties_nomination_categories"
        {...PropertyNominationCategories}
      />
    </Admin>
  );
}

export default MyAdmin;

//   const AppWrapper: React.FC = () => (
//     <StoreContextProvider value={store}>
//       <MyAdmin />
//     </StoreContextProvider>
//   );
