// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Roles = {
  "ADMIN": "ADMIN",
  "STAFF": "STAFF",
  "STUDENT": "STUDENT"
};

const CourseLevel = {
  "FOUNDATION": "FOUNDATION",
  "INTERMEDIATE": "INTERMEDIATE",
  "ADVANCED": "ADVANCED",
  "MASTERADVANCED": "MASTERADVANCED"
};

const CourseCategory = {
  "AESTHETICS": "AESTHETICS",
  "BEAUTY": "BEAUTY"
};

const { Users, Course, Note } = initSchema(schema);

export {
  Users,
  Course,
  Note,
  Roles,
  CourseLevel,
  CourseCategory
};