import passport from "passport";
export const authChecker = passport.authenticate("jwt",{session: false})

// from this user will be check