# NookMind — Release Status

## État actuel (2026-05-21)

### ✅ Ce qui est fait

#### Android
- Keystore de signature généré : `~/nookmind-release.jks` (sur le Mac de dev principal)
  - Alias : `nookmind`
  - Mot de passe : stocké dans `android/keystore.properties` (non versionné)
- `android/app/build.gradle` configuré avec `signingConfigs.release`
- AAB signé généré avec succès : `android/app/build/outputs/bundle/release/app-release.aab`
  - Ce fichier n'est pas versionné (`.gitignore`), il faut le regénérer ou le transférer manuellement

#### Corrections UI (mergées sur main)
- Fix sliders qui débordaient à gauche sur petits écrans (cause : wrapper `SearchSectionStack` sans `w-full` dans un container `flex items-center`)
- Fix modales qui sortaient de l'écran en haut sur mobile (`max-h-[90dvh]` sur tous les detail modals)

---

## 🚀 Prochaine étape : Uploader sur le Play Store

### Option A — Depuis un autre ordi (sans rebuilder)
1. Transférer le fichier `app-release.aab` depuis le Mac de dev vers l'autre ordi
2. Aller sur [Play Console](https://play.google.com/console)
3. Créer une nouvelle app → Production → Créer une release
4. Uploader le `.aab`
5. Remplir : description courte, description longue, catégorie, screenshots
6. Soumettre pour review

### Option B — Rebuilder le AAB sur un nouvel ordi
Prérequis sur le nouvel ordi :
- Node.js + npm
- Java 21 (JDK) : `brew install --cask temurin@21`
- Android SDK (Android Studio)

Étapes :
```bash
# 1. Cloner le repo
git clone https://github.com/paul00b/NookMind.git
cd NookMind

# 2. Installer les dépendances
npm install

# 3. Copier le keystore (depuis le Mac de dev ou depuis un stockage sécurisé)
cp /path/to/nookmind-release.jks ~/nookmind-release.jks

# 4. Recréer keystore.properties
cat > android/keystore.properties << 'EOF'
storePassword=LE_MOT_DE_PASSE
keyPassword=LE_MOT_DE_PASSE
keyAlias=nookmind
storeFile=/Users/TON_USER/nookmind-release.jks
EOF

# 5. Sync et build
npm run cap:sync
cd android && JAVA_HOME=$(/usr/libexec/java_home -v 21) ./gradlew bundleRelease

# AAB généré dans :
# android/app/build/outputs/bundle/release/app-release.aab
```

---

## ⏳ Reste à faire avant publication

### Android (Play Store)
- [ ] Uploader le `.aab` sur Play Console
- [ ] Remplir la fiche store :
  - Description courte (80 chars max)
  - Description longue
  - Catégorie (Lifestyle ou Divertissement)
  - Screenshots téléphone Android (min 2, format 16:9)
  - Icône hi-res 512×512 PNG (disponible dans `resources/icon.png`)
- [ ] URL politique de confidentialité (la page `/privacy` de l'app web ou une URL publique)
- [ ] Soumettre pour review Google (~3 jours)

### iOS (App Store) — pour plus tard
- [ ] Compte Apple Developer ($99/an) — **bloquant**
- [ ] Créer `PrivacyInfo.xcprivacy` (requis iOS 17+)
- [ ] Corriger Bundle ID dans Xcode : `fr.paulbr.bookmind` → `fr.paulbr.nookmind`
- [ ] Build signé via Xcode sur un Mac avec compte Apple Developer
- [ ] Screenshots iPhone (6.9", 6.5") + iPad si ciblé

---

## Infos techniques

| Élément | Valeur |
|---------|--------|
| App ID Android | `fr.paulbr.nookmind` |
| App ID iOS | `fr.paulbr.nookmind` |
| Version | 1.0 (versionCode 1) |
| Min Android SDK | 24 (Android 7.0) |
| Target Android SDK | 36 (Android 15) |
| Keystore alias | `nookmind` |
| Keystore location | `~/nookmind-release.jks` (hors repo) |
| Firebase project | `nookmind-8f5be` |
