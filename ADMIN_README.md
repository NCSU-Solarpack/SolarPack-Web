# SolarPack Admin System

A comprehensive content management system for the SolarPack website that allows non-technical team members to update content without coding.

## Features

### 🔐 **Three-Tier Authentication**
- **Member Access**: View schedules, team info, and announcements
- **Leader Access**: Edit schedules, submit orders, view all content
- **Director Access**: Full access to edit team, content, approve orders, manage settings

### 📊 **Content Management**
- **Team Management**: Add, edit, and remove team members with photos and bios
- **Schedule Tracking**: Create and manage project timelines and milestones
- **Order Management**: Submit, track, and approve parts orders
- **Announcements**: Post and manage team announcements and events

### 🔄 **Automatic Updates**
- Changes are automatically saved to GitHub
- Website rebuilds and deploys automatically when content is updated
- No manual file editing or deployments required

## Getting Started

### 1. Access the Admin Interface
Navigate to `https://your-website.com/admin` in your browser.

### 2. Login with Access Code
Use one of the predefined access codes:
- **Director**: `director2024` (change this!)
- **Leader**: `leader2024` (change this!)
- **Member**: `member2024` (change this!)

⚠️ **Important**: Change these default passwords in `src/utils/auth.js`

### 3. Configure GitHub Integration

#### Step 1: Create a Personal Access Token
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token" → "Generate new token (classic)"
3. Set expiration and select these scopes:
   - `repo` - Full control of private repositories
   - `workflow` - Update GitHub Action workflows (optional)
4. Generate and copy the token

#### Step 2: Add Token to Admin Interface
1. Go to Admin → Settings
2. Paste your GitHub token
3. Click "Save Token" and "Test Connection"

### 4. Start Managing Content
- **Team**: Add new members, update bios, reorder team display
- **Schedules**: Create project timelines, set milestones, track progress
- **Orders**: Submit new parts orders, track delivery status
- **Content**: Post announcements, create events, manage communications

## How It Works

### Data Storage
All content is stored in JSON files in the `public/data/` directory:
- `team.json` - Team member information
- `schedules.json` - Project schedules and parts orders
- `content.json` - Announcements and events

### Automatic Deployment
1. Admin interface updates JSON files via GitHub API
2. GitHub Actions detects changes to data files
3. Website automatically rebuilds and deploys
4. Changes are live within 2-3 minutes

### Security
- Client-side authentication with session management
- GitHub token stored locally in browser
- Three permission levels for different access rights
- All changes tracked through GitHub commit history

## Customization

### Changing Passwords
Edit `src/utils/auth.js` and update the `PASSWORD_HASHES` object:

```javascript
const PASSWORD_HASHES = {
  [hashPassword('your-new-director-password')]: AUTH_LEVELS.DIRECTOR,
  [hashPassword('your-new-leader-password')]: AUTH_LEVELS.LEADER,
  [hashPassword('your-new-member-password')]: AUTH_LEVELS.MEMBER
};
```

### Adding New Content Types
1. Extend the JSON structure in data files
2. Add new manager components in `src/components/admin/`
3. Update the AdminDashboard navigation

### Modifying Permissions
Edit the `PERMISSIONS` object in `src/utils/auth.js` to change what each role can do.

## Data Structure

### Team Members (`team.json`)
```json
{
  "id": 1,
  "name": "John Doe",
  "role": "Technical Director",
  "image": "/images/headshots/john_doe.jpg",
  "bio": "Description of role and background...",
  "email": "john@example.com",
  "linkedin": "https://linkedin.com/in/johndoe",
  "order": 1
}
```

### Schedules (`schedules.json`)
```json
{
  "id": 1,
  "team": "Aerodynamics",
  "title": "Wind Tunnel Testing",
  "description": "Initial aerodynamic testing phase",
  "startDate": "2024-11-01",
  "endDate": "2024-11-15",
  "status": "upcoming",
  "priority": "high",
  "assignedTo": "Team Lead Name",
  "milestones": [
    {
      "date": "2024-11-05",
      "description": "Setup complete"
    }
  ]
}
```

### Orders (`schedules.json`)
```json
{
  "id": 1,
  "partName": "Carbon Fiber Sheets",
  "supplier": "DragonPlate",
  "quantity": 10,
  "unitPrice": 89.99,
  "totalPrice": 899.90,
  "orderDate": "2024-10-25",
  "expectedDelivery": "2024-11-08",
  "status": "pending_approval",
  "requestedBy": "Team Member",
  "team": "Aerodynamics",
  "priority": "medium",
  "notes": "For aeroshell construction"
}
```

### Announcements (`content.json`)
```json
{
  "id": 1,
  "title": "Team Meeting - November 5th",
  "content": "All team leads are required to attend...",
  "author": "Project Director",
  "date": "2024-10-28",
  "priority": "high",
  "teams": ["all"],
  "expiryDate": "2024-11-05"
}
```

## Troubleshooting

### Changes Not Appearing
1. Check GitHub Actions are running successfully
2. Verify GitHub token has proper permissions
3. Ensure JSON files were updated in repository
4. Wait 2-3 minutes for rebuild to complete

### Authentication Issues
1. Clear browser localStorage and try again
2. Check if passwords were changed from defaults
3. Verify auth.js configuration

### GitHub API Errors
1. Check token hasn't expired
2. Verify repository permissions
3. Ensure token has `repo` scope
4. Check network connectivity

## Support

For technical issues:
1. Check browser console for error messages
2. Verify GitHub repository settings
3. Review GitHub Actions logs
4. Contact the technical team for assistance

## Security Notes

- Change default passwords immediately
- GitHub tokens provide repository access - store securely
- Review who has access to different permission levels
- Monitor GitHub commit history for all changes
- Consider token expiration policies