import {
  createMap,
  createMapper,
  forMember,
  mapFrom,
  Mapper,
} from "@automapper/core";
import { pojos, PojosMetadataMap } from "@automapper/pojos";
import { UserObject, UserResponseObject } from "../types/user";

const create = () => createMapper({ strategyInitializer: pojos() });

export function authMeUserResponseMapper(): Mapper {
  const mapper = create();
  createMap<UserObject, UserResponseObject>(
    mapper,
    "UserObject",
    "UserResponseObject",
    forMember(
      (d) => d.username,
      mapFrom((s) => s.username)
    ),
    forMember(
      (d) => d.email,
      mapFrom((s) => s.email)
    ),
    forMember(
      (d) => d.isAdmin,
      mapFrom((s) => s.isAdmin)
    ),
    forMember(
      (d) => d.isVerified,
      mapFrom((s) => s.isVerified)
    )
  );
  return mapper;
}
