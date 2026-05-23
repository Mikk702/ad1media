# Ad1.tv Traffic Dashboard

## Setup

### 1. Create a Google Cloud service account

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Select your project (or create one)
3. Go to **APIs & Services → Library**, search for **Google Analytics Data API**, enable it
4. Go to **APIs & Services → Credentials → Create Credentials → Service Account**
5. Give it any name, click **Done**
6. Click the service account you just created → **Keys → Add Key → JSON**
7. Download the JSON file — save it as `key.json` in this folder

### 2. Grant the service account access to GA4

1. Open [analytics.google.com](https://analytics.google.com)
2. Go to **Admin → Property Access Management**
3. Click **+** → **Add users**
4. Paste the service account email (looks like `name@project.iam.gserviceaccount.com`)
5. Set role to **Viewer** → **Add**

### 3. Get your GA4 Property ID

In GA4: **Admin → Property Settings** → copy the numeric **Property ID** (not the Measurement ID)

### 4. Configure

Copy `.env.example` to `.env` and fill in your values:

```
GA4_KEY_FILE=./key.json
GA4_PROPERTY_ID=your_numeric_property_id
DASHBOARD_PASSWORD=pick_a_password
```

### 5. Run

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)
