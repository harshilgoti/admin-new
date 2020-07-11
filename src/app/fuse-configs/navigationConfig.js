import i18next from "i18next";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);

const navigationConfig = [
  {
    id: "applications",
    title: "Applications",
    translate: "APPLICATIONS",
    type: "group",
    icon: "apps",
    children: [
      // {
      //   id: "dashboard",
      //   title: "Dashboard",
      //   translate: "Dashboard",
      //   icon: "dashboard",
      //   type: "item",
      //   url: "/dashboard"
      // },
      {
        id: "events",
        title: "Events",
        translate: "Events",
        icon: "supervisor_account",
        type: "item",
        url: "/events"
      },
      // {
      //   id: "languages",
      //   title: "Languages",
      //   translate: "Languages",
      //   icon: "language",
      //   type: "item",
      //   url: "/languages"
      // },
      // {
      //   id: "roles",
      //   title: "Roles",
      //   translate: "Roles",
      //   icon: "developer_mode",
      //   type: "item",
      //   url: "/roles"
      // },
      // {
      //   id: "products",
      //   title: "Products",
      //   translate: "Products",
      //   icon: "shopping_basket",
      //   type: "item",
      //   url: "/products"
      // },
      // {
      //   id: "user_workspace",
      //   title: "User workspaces",
      //   translate: "User workspaces",
      //   icon: "person_add",
      //   type: "item",
      //   url: "/user-workspaces"
      // },
      // {
      //   id:"topics",
      //   title:"Topics",
      //   translate:"Topics",
      //   icon: "picture_in_picture",
      //   type: "item",
      //   url: "/topics"
      // },
      // {
      //   id:"tools",
      //   title:"Tools",
      //   translate:"Tools",
      //   icon: "build",
      //   type: "item",
      //   url: "/tools"
      // },
      // {
      //   id:"skills",
      //   title:"Skills",
      //   translate:"Skills",
      //   icon: "assignment",
      //   type: "item",
      //   url: "/skills"
      // }
    ]
  }
];

export default navigationConfig;
