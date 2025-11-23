# PC Bang Manager

Application de gestion pour PC Bang (Cybercafé) avec Electron, Vue 3, TypeScript et Prisma.

## Installation

### Prérequis
- Node.js v18+
- MariaDB ou MySQL

### Étapes

1. Installer les dépendances
```bash
npm install
```

2. Créer la base de données
```bash
mysql -u root -p
```
```sql
CREATE DATABASE pcbang CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

3. Configurer la connexion (créer `database.env`)
```env
DATABASE_URL="mysql://root:password@localhost:3306/pcbang"
```

4. Générer les tables
```bash
npx prisma generate --schema ./src/main/repositories/prisma/schema.prisma
npx prisma db push --schema ./src/main/repositories/prisma/schema.prisma
```

5. Lancer
```bash
npm start
```

## Commandes utiles

```bash
npm start                  # Lancer l'application
npm run make              # Créer un installeur
npx prisma studio --schema ./src/main/repositories/prisma/schema.prisma  # Interface BD
```

## Troubleshooting

- Si erreur de connexion BD : vérifier que MySQL est démarré et que `database.env` est correct
- Si l'app ne démarre pas : supprimer `node_modules` et relancer `npm install`
