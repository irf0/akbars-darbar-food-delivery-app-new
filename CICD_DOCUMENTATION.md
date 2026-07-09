# 📝 Darbar App V2 – CI/CD Setup

### Step 1: Configure Expo Build

Update `eas.json`:

- `distribution: "store"`
- `channel: "production"`
- `autoIncrement: true`

---

### Step 2: Generate Production Keystore

Run:

```bash
eas credentials
```

Export the upload certificate:

```bash
keytool -export -rfc -alias upload -file upload_certificate.pem -keystore YOUR_FILE_NAME.jks
```

---

### Step 3: Request Google Play Upload Key Reset

- Upload `upload_certificate.pem` to **Google Play Console → Test and Release → App Integrity**
- Submit an upload key reset request using **"I lost my upload key"**
- Wait for approval (~48 hours)

---

### Step 4: Set Up GitHub Actions

Create:

```text
.github/workflows/deploy.yml
```

Keep the workflow disabled during development by using a placeholder branch:

```yaml
on:
  push:
    branches:
      - production-release-do-not-run-yet
```

---

### Step 5: Add Expo Token

Create an Expo Access Token and add it to GitHub Secrets as:

```text
EXPO_TOKEN
```

---

### Step 6: Release the App

Change the workflow trigger back to:

```yaml
on:
  push:
    branches:
      - master
```

Push the code:

```bash
git add .
git commit -m "feat: version 2 release"
git push origin master
```

GitHub Actions will automatically:

- Build the Android App Bundle (`.aab`)
- Sign the build
- Upload it to Google Play Console as a draft release
