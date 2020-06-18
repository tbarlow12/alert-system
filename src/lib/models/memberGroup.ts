import { Member } from "./member";

export interface MemberGroup {
  id: string;
  name: string;
  members: Member[];
}