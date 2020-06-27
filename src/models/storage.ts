import { Member } from "./member";
import { MemberGroup } from "./memberGroup";

export interface Storage {
  getMembers(): Promise<Member[]>;
  getMember(id: number): Promise<Member>;
  getGroups(): Promise<MemberGroup[]>;
  getGroup(id: number): Promise<MemberGroup>;
}