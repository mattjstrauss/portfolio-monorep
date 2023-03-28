"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_config = require("dotenv/config");
var import_core5 = require("@keystone-6/core");

// schemas/Experiences.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
var Experiences = {
  Experience: (0, import_core.list)({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: import_access.allowAll,
    // this is the fields for our Post list
    fields: {
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      // the document field can be used for making rich editable content
      //   you can find out more at https://keystonejs.com/docs/guides/document-fields
      description: (0, import_fields_document.document)({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1]
        ],
        links: true,
        dividers: true
      }),
      startDate: (0, import_fields.calendarDay)({
        db: { map: "start_date" }
        // isIndexed: 'unique',
      }),
      endDate: (0, import_fields.calendarDay)({
        db: { map: "end_date" }
        // isIndexed: 'unique',
      }),
      company: (0, import_fields.relationship)({
        ref: "Company.experience",
        many: false,
        ui: {
          displayMode: "cards",
          cardFields: ["name", "image"],
          inlineConnect: true,
          inlineCreate: { fields: ["name", "image", "altText"] },
          inlineEdit: { fields: ["name", "image", "altText"] }
        }
      }),
      // // with this field, you can add some Skills to Experiences
      skills: (0, import_fields.relationship)({
        // we could have used 'Tag', but then the relationship would only be 1-way
        ref: "Skill.experiences",
        // a Post can have many Skills, not just one
        many: true
        // this is some customisations for changing how this will look in the AdminUI
        // ui: {
        // 	displayMode: 'cards',
        // 	cardFields: ['name', 'image'],
        // 	inlineEdit: { fields: ['name', 'image'] },
        // 	linkToItem: true,
        // 	inlineConnect: true,
        // 	inlineCreate: { fields: ['name', 'image'] },
        // },
      })
    }
  })
};

// schemas/Users.ts
var import_core2 = require("@keystone-6/core");
var import_fields2 = require("@keystone-6/core/fields");
var import_access2 = require("@keystone-6/core/access");
var Users = {
  User: (0, import_core2.list)({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: import_access2.allowAll,
    // this is the fields for our User list
    fields: {
      // by adding isRequired, we enforce that every User should have a name
      //   if no name is provided, an error will be displayed
      name: (0, import_fields2.text)({ validation: { isRequired: true } }),
      email: (0, import_fields2.text)({
        validation: { isRequired: true },
        // by adding isIndexed: 'unique', we're saying that no user can have the same
        // email as another user - this may or may not be a good idea for your project
        isIndexed: "unique"
      }),
      password: (0, import_fields2.password)({ validation: { isRequired: true } }),
      createdAt: (0, import_fields2.timestamp)({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: "now" }
      })
    }
  })
};

// schemas/Skills.ts
var import_cloudinary = require("@keystone-6/cloudinary");
var import_core3 = require("@keystone-6/core");
var import_fields3 = require("@keystone-6/core/fields");
var import_fields_document2 = require("@keystone-6/fields-document");
var import_access3 = require("@keystone-6/core/access");
var cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
  folder: "matthewjstrauss"
};
var Skills = {
  Skill: (0, import_core3.list)({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: import_access3.allowAll,
    fields: {
      name: (0, import_fields3.text)({ validation: { isRequired: true } }),
      // the document field can be used for making rich editable content
      //   you can find out more at https://keystonejs.com/docs/guides/document-fields
      description: (0, import_fields_document2.document)({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1]
        ],
        links: true,
        dividers: true
      }),
      image: (0, import_cloudinary.cloudinaryImage)({
        // @ts-ignore
        cloudinary,
        label: "Source"
      }),
      altText: (0, import_fields3.text)(),
      // this can be helpful to find out all the Experiences associated with a Skill
      experiences: (0, import_fields3.relationship)({
        ref: "Experience.skills",
        many: true
      })
    },
    ui: {
      listView: {
        initialColumns: ["image", "altText"]
      }
    }
  })
};

// schemas/Companies.ts
var import_cloudinary2 = require("@keystone-6/cloudinary");
var import_core4 = require("@keystone-6/core");
var import_fields4 = require("@keystone-6/core/fields");
var import_access4 = require("@keystone-6/core/access");
var import_fields_document3 = require("@keystone-6/fields-document");
var cloudinary2 = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
  folder: "matthewjstrauss"
};
var Companies = {
  Company: (0, import_core4.list)({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: import_access4.allowAll,
    fields: {
      name: (0, import_fields4.text)({ validation: { isRequired: true } }),
      // the document field can be used for making rich editable content
      //   you can find out more at https://keystonejs.com/docs/guides/document-fields
      description: (0, import_fields_document3.document)({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1]
        ],
        links: true,
        dividers: true
      }),
      image: (0, import_cloudinary2.cloudinaryImage)({
        // @ts-ignore
        cloudinary: cloudinary2,
        label: "Source"
      }),
      altText: (0, import_fields4.text)(),
      experience: (0, import_fields4.relationship)({ ref: "Experience.company" })
    },
    ui: {
      listView: {
        initialColumns: ["name", "image", "altText", "experience"]
      }
    }
  })
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "name createdAt",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "email", "password"]
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var databaseURL = process.env.DATABASE_URL || "mysql://root:password@localhost:3306/portfolio";
var keystone_default = withAuth(
  (0, import_core5.config)({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL || "http://localhost:3001"],
        credentials: true
      }
    },
    db: {
      provider: "mysql",
      url: databaseURL,
      onConnect: async (context) => {
      },
      // Optional advanced configuration
      enableLogging: true,
      idField: { kind: "uuid" }
    },
    lists: {
      ...Users,
      ...Experiences,
      ...Skills,
      ...Companies
    },
    session
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
