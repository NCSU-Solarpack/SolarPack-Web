# Quick Reference: Supabase Integration

## Environment Setup
```bash
# 1. Copy environment template
cp .env.example .env

# 2. Edit .env with your Supabase credentials
# Get from: https://supabase.com/dashboard → Your Project → Settings → API
```

## Supabase Service Usage

### Import the service
```javascript
import { supabaseService } from '../../utils/supabase';
```

### Check if configured
```javascript
if (!supabaseService.isConfigured()) {
  console.warn('Supabase not configured');
  return;
}
```

### Common Operations

#### Team Members
```javascript
// Get all
const data = await supabaseService.getTeamMembers();

// Save/Update
await supabaseService.saveTeamMember({
  id: 123, // optional for insert
  name: 'John Doe',
  role: 'Technical Director',
  order: 1
});

// Delete
await supabaseService.deleteTeamMember(123);
```

#### Alumni
```javascript
// Get all
const data = await supabaseService.getAlumni();

// Save
await supabaseService.saveAlumniSemester({
  semester: 'Fall 2024',
  leadership: [
    { role: 'President', name: 'Jane Doe' }
  ]
});

// Delete
await supabaseService.deleteAlumniSemester(id);
```

#### Sponsors
```javascript
// Get all
const data = await supabaseService.getSponsors();

// Save
await supabaseService.saveSponsor({
  tier: 'Platinum',
  sponsors: [
    { name: 'Company Name', logo: '/path/to/logo.png' }
  ]
});
```

#### Schedules
```javascript
// Get all
const data = await supabaseService.getSchedules();

// Save
await supabaseService.saveSchedule({
  title: 'Team Meeting',
  date: '2024-11-15',
  time: '3:00 PM',
  location: 'EB3'
});
```

#### Orders
```javascript
// Get all
const data = await supabaseService.getOrders();

// Save
await supabaseService.saveOrder({
  item: 'Carbon fiber sheets',
  quantity: 10,
  priority: 'high'
});
```

### Real-Time Subscriptions
```javascript
// Subscribe to changes
const subscription = supabaseService.subscribeToTable('team_members', (payload) => {
  console.log('Change detected:', payload);
  // Refresh your data here
  loadData();
});

// Cleanup on unmount
return () => {
  supabaseService.unsubscribe(subscription);
};
```

## Admin Component Pattern

```javascript
const [data, setData] = useState([]);
const [isSaving, setIsSaving] = useState(false);
const [isLoading, setIsLoading] = useState(true);

// Load data
useEffect(() => {
  loadData();
}, []);

const loadData = async () => {
  setIsLoading(true);
  try {
    const result = await supabaseService.getTeamMembers();
    setData(result);
  } catch (error) {
    console.error('Error loading:', error);
    alert('Failed to load data: ' + error.message);
  } finally {
    setIsLoading(false);
  }
};

// Save data
const handleSave = async (item) => {
  setIsSaving(true);
  try {
    await supabaseService.saveTeamMember(item);
    await loadData(); // Refresh
    alert('✓ Saved successfully!');
  } catch (error) {
    console.error('Error saving:', error);
    alert('Failed to save: ' + error.message);
  } finally {
    setIsSaving(false);
  }
};

// Delete data
const handleDelete = async (id) => {
  if (!confirm('Are you sure?')) return;
  
  try {
    await supabaseService.deleteTeamMember(id);
    await loadData(); // Refresh
    alert('✓ Deleted successfully!');
  } catch (error) {
    console.error('Error deleting:', error);
    alert('Failed to delete: ' + error.message);
  }
};
```

## Front-End Page Pattern

```javascript
import { supabaseService } from '../utils/supabase';

const TeamPage = () => {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeamData();
  }, []);

  const loadTeamData = async () => {
    try {
      const data = await supabaseService.getTeamMembers();
      setTeamData(data.teamMembers || []);
    } catch (error) {
      console.error('Error loading team:', error);
      // Fallback to JSON file if Supabase fails
      const response = await fetch('/data/team.json');
      const fallbackData = await response.json();
      setTeamData(fallbackData.teamMembers || []);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {teamData.map(member => (
        <div key={member.id}>
          <h3>{member.name}</h3>
          <p>{member.role}</p>
        </div>
      ))}
    </div>
  );
};
```

## Error Handling

```javascript
try {
  const data = await supabaseService.getTeamMembers();
  setData(data);
} catch (error) {
  if (error.message.includes('not configured')) {
    console.warn('Supabase not set up yet');
    // Use fallback data source
  } else if (error.code === 'PGRST116') {
    console.error('Table does not exist');
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Common Issues

### "Supabase not configured"
```javascript
// Check .env file exists and has correct values
// Restart dev server: npm run dev
```

### "Table does not exist"
```javascript
// Run SQL scripts from SUPABASE_SETUP_GUIDE.md
// Check table name spelling (case-sensitive)
```

### "Row Level Security policy violation"
```javascript
// Check RLS policies in Supabase dashboard
// Ensure public read access is enabled
```

## Migration Checklist

- [ ] Create Supabase project
- [ ] Copy credentials to `.env`
- [ ] Run SQL scripts to create tables
- [ ] Test connection in console
- [ ] Update one admin component
- [ ] Test CRUD operations
- [ ] Update remaining admin components
- [ ] Update front-end pages
- [ ] Test end-to-end
- [ ] Deploy with environment variables

## Need Help?

1. Check `SUPABASE_SETUP_GUIDE.md` for detailed instructions
2. Review Supabase docs: https://supabase.com/docs
3. Check browser console for detailed errors
4. Verify environment variables are set correctly
