import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Roles {
  ADMIN = "ADMIN",
  STAFF = "STAFF",
  STUDENT = "STUDENT"
}

export enum CourseLevel {
  FOUNDATION = "FOUNDATION",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  MASTERADVANCED = "MASTERADVANCED"
}

export enum CourseCategory {
  AESTHETICS = "AESTHETICS",
  BEAUTY = "BEAUTY"
}



export declare class Users {
  readonly id: string;
  readonly email?: string;
  readonly first_name?: string;
  readonly last_name?: string;
  readonly company_name?: string;
  readonly date_joined?: string;
  readonly date_of_birth?: string;
  readonly role?: Roles | keyof typeof Roles;
  readonly courses?: (string | null)[];
  constructor(init: ModelInit<Users>);
  static copyOf(source: Users, mutator: (draft: MutableModel<Users>) => MutableModel<Users> | void): Users;
}

export declare class Course {
  readonly id: string;
  readonly name?: string;
  readonly coursework?: string;
  readonly assessment?: string;
  readonly cpdNo?: string;
  readonly category?: CourseCategory | keyof typeof CourseCategory;
  readonly courseLevel?: CourseLevel | keyof typeof CourseLevel;
  readonly description?: string;
  constructor(init: ModelInit<Course>);
  static copyOf(source: Course, mutator: (draft: MutableModel<Course>) => MutableModel<Course> | void): Course;
}

export declare class Note {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly image?: string;
  constructor(init: ModelInit<Note>);
  static copyOf(source: Note, mutator: (draft: MutableModel<Note>) => MutableModel<Note> | void): Note;
}