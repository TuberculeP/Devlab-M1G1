import { Router } from "express";
import passport from "passport";
import { PgUser } from "../../../../types/users";

const localRouter = Router();

localRouter.post("/", (req, res, next) => {
  passport.authenticate(
    "local",
    (error: Error, user: PgUser, info: { message?: string }) => {
      if (error) {
        return res.status(500).send(error.message); // Erreur interne
      }
      if (!user) {
        return res.status(400).send(info.message || "Authentication failed"); // Erreur custom
      }

      // Si l'utilisateur est valide, connecte-le avec req.login
      return req.logIn(user, (err) => {
        if (err) {
          return res.status(500).send("Failed to log in user"); // Problème de session
        }

        // Renvoyer le cookie de session généré par Passport
        return res
          .status(200)
          .json({ message: "Authentication successful", user });
      });
    }
  )(req, res, next); // Appelle immédiatement le middleware pour traiter la requête
});

export { localRouter };
