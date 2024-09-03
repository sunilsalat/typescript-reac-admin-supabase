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
import Books from "./books";
import Laptops from "./laptops";

const store = localStorageStore(undefined, "ECommerce");

function MyAdmin() {
  const [themeName] = useStore<string>("themeName", "soft");
  const lightTheme = themes.find(
    (theme: any) => theme.name === themeName
  )?.light;
  const darkTheme = themes.find((theme: any) => theme.name === themeName)?.dark;

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
      <Resource name="books" {...Books} />
      <Resource name="laptops" {...Laptops} />
      <Resource name="nations" {...Nations} />
      <Resource name="currencies" />
    </Admin>
  );
}

export default MyAdmin;

//   const AppWrapper: React.FC = () => (
//     <StoreContextProvider value={store}>
//       <MyAdmin />
//     </StoreContextProvider>
//   );
