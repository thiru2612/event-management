// src/pages/ViewEvents.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../api";
import "../styles/Events.css";

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortDir, setSortDir] = useState('asc');
  const [currentPage, setCurrentPage] = useState(0); // Backend uses 0-based indexing
  const [eventsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    loadEvents();
  }, [currentPage, filter, sortBy, sortDir]);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const response = await getEvents({
        page: currentPage,
        size: eventsPerPage,
        sortBy: sortBy === 'title' ? 'title' : sortBy,
        sortDir: sortDir,
        type: filter !== 'all' ? filter : undefined
      });
      
      if (response.data.events) {
        setEvents(response.data.events);
        setTotalPages(response.data.totalPages);
        setTotalItems(response.data.totalItems);
      } else {
        // Fallback - handle client-side filtering and sorting
        let fallbackEvents = Array.isArray(response.data) ? response.data : [
        { 
          id: 1, 
          title: "Tech Innovation Summit 2024", 
          date: "2024-12-15", 
          description: "Join industry leaders as we explore the latest technological innovations shaping our future. Network with professionals and discover cutting-edge solutions.",
          location: "Virtual Event",
          type: "conference"
        },
        { 
          id: 2, 
          title: "AI & Machine Learning Workshop", 
          date: "2024-12-20", 
          description: "Hands-on workshop covering the fundamentals of AI and machine learning. Perfect for beginners and intermediate developers.",
          location: "Online",
          type: "workshop"
        },
        { 
          id: 3, 
          title: "Digital Marketing Masterclass", 
          date: "2024-12-25", 
          description: "Learn advanced digital marketing strategies from industry experts. Boost your online presence and drive more conversions.",
          location: "Hybrid Event",
          type: "masterclass"
        },
        { 
          id: 4, 
          title: "Cloud Computing Bootcamp", 
          date: "2024-12-28", 
          description: "Comprehensive bootcamp covering AWS, Azure, and Google Cloud platforms. Get hands-on experience with real-world projects.",
          location: "Online",
          type: "bootcamp"
        },
        { 
          id: 5, 
          title: "Startup Pitch Competition", 
          date: "2025-01-05", 
          description: "Present your startup idea to industry experts and investors. Win funding and mentorship opportunities.",
          location: "San Francisco",
          type: "competition"
        },
        { 
          id: 6, 
          title: "UX Design Trends 2025", 
          date: "2025-01-10", 
          description: "Explore the latest trends in user experience design. Learn from top designers and agencies.",
          location: "Virtual Event",
          type: "webinar"
        },
        { 
          id: 7, 
          title: "Blockchain Development Course", 
          date: "2025-01-15", 
          description: "Learn blockchain development from scratch. Build your first DApp and understand smart contracts.",
          location: "Online",
          type: "course"
        },
        { 
          id: 8, 
          title: "Data Science Conference", 
          date: "2025-01-20", 
          description: "Join data scientists and analysts to discuss the latest trends in data science and machine learning.",
          location: "New York",
          type: "conference"
        }
        ];
        
        // Client-side filtering
        if (filter !== 'all') {
          fallbackEvents = fallbackEvents.filter(event => event.type === filter);
        }
        
        // Client-side sorting
        fallbackEvents.sort((a, b) => {
          let aVal, bVal;
          switch (sortBy) {
            case 'title':
              aVal = a.title.toLowerCase();
              bVal = b.title.toLowerCase();
              break;
            case 'date':
              aVal = new Date(a.date);
              bVal = new Date(b.date);
              break;
            case 'location':
              aVal = a.location.toLowerCase();
              bVal = b.location.toLowerCase();
              break;
            case 'type':
              aVal = a.type.toLowerCase();
              bVal = b.type.toLowerCase();
              break;
            default:
              return 0;
          }
          
          if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
          if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
          return 0;
        });
        
        // Client-side pagination
        const startIndex = currentPage * eventsPerPage;
        const endIndex = startIndex + eventsPerPage;
        const paginatedEvents = fallbackEvents.slice(startIndex, endIndex);
        
        setEvents(paginatedEvents);
        setTotalPages(Math.ceil(fallbackEvents.length / eventsPerPage));
        setTotalItems(fallbackEvents.length);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const displayEvents = events;

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(0);
  };

  const handleSortChange = (newSort) => {
    if (newSort === sortBy) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSort);
      setSortDir('asc');
    }
    setCurrentPage(0);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    const displayPage = currentPage + 1; // Convert to 1-based for display
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (displayPage <= 3) {
        for (let i = 1; i <= 4; i++) pageNumbers.push(i);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (displayPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = displayPage - 1; i <= displayPage + 1; i++) pageNumbers.push(i);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  if (loading) {
    return (
      <div className="events-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <h3>Loading Events...</h3>
          <p>Please wait while we fetch the latest events for you.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="events-page">
      <div className="events-sidebar">
        <div className="sidebar-card">
          <div className="sidebar-header">
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9,22 9,12 15,12 15,22"></polyline>
              </svg>
              Categories
            </h3>
          </div>
          
          <div className="events-filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('all')}
            >
              <svg className="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>
              All Events
            </button>
            <button 
              className={`filter-btn ${filter === 'conference' ? 'active' : ''}`}
              onClick={() => handleFilterChange('conference')}
            >
              <svg className="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Conference
            </button>
            <button 
              className={`filter-btn ${filter === 'workshop' ? 'active' : ''}`}
              onClick={() => handleFilterChange('workshop')}
            >
              <svg className="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
              Workshop
            </button>
            <button 
              className={`filter-btn ${filter === 'masterclass' ? 'active' : ''}`}
              onClick={() => handleFilterChange('masterclass')}
            >
              <svg className="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              Masterclass
            </button>
            <button 
              className={`filter-btn ${filter === 'webinar' ? 'active' : ''}`}
              onClick={() => handleFilterChange('webinar')}
            >
              <svg className="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              Webinar
            </button>
            <button 
              className={`filter-btn ${filter === 'bootcamp' ? 'active' : ''}`}
              onClick={() => handleFilterChange('bootcamp')}
            >
              <svg className="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              Bootcamp
            </button>
          </div>
          
          <div className="events-sort">
            <label className="sort-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18"></path>
                <path d="M7 12h10"></path>
                <path d="M10 18h4"></path>
              </svg>
              Sort by
            </label>
            <select 
              className="sort-select"
              value={`${sortBy}-${sortDir}`}
              onChange={(e) => {
                const [field, direction] = e.target.value.split('-');
                setSortBy(field);
                setSortDir(direction);
                setCurrentPage(0);
              }}
            >
              <option value="date-asc">Date (Oldest)</option>
              <option value="date-desc">Date (Newest)</option>
              <option value="title-asc">Name (A-Z)</option>
              <option value="title-desc">Name (Z-A)</option>
              <option value="location-asc">Location (A-Z)</option>
              <option value="location-desc">Location (Z-A)</option>
              <option value="type-asc">Type (A-Z)</option>
              <option value="type-desc">Type (Z-A)</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="events-main">
        <div className="events-header">
          <h2>Upcoming Events</h2>
          <p>Discover and participate in exciting events tailored for your interests and professional growth.</p>
        </div>

        <div className="events-content">
          {displayEvents.length > 0 ? (
            <>
              <div className="event-grid">
                {displayEvents.map((event) => (
            <div className="event-card" key={event.id}>
              <div className="event-card-header">
                <div className="event-date-badge">
                  <svg className="event-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {formatDate(event.date)}
                </div>
                <h3>{event.title}</h3>
              </div>
              
              <div className="event-card-body">
                <p className="event-description">{event.description}</p>
                
                <div className="event-meta">
                  <div className="event-meta-item">
                    <svg className="event-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{event.location || 'Virtual Event'}</span>
                  </div>
                  
                  <div className="event-meta-item">
                    <svg className="event-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <span>{event.type ? event.type.charAt(0).toUpperCase() + event.type.slice(1) : 'Event'}</span>
                  </div>
                </div>
              </div>
              
              <div className="event-card-footer">
                <Link to={`/participate/${event.id}`} className="participate-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10,17 15,12 10,7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg>
                  Join Event
                </Link>
              </div>
            </div>
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="events-pagination">
                  <button 
                    className="pagination-btn"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 0}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                  </button>
                  
                  {getPageNumbers().map((pageNum, index) => (
                    pageNum === '...' ? (
                      <span key={index} className="pagination-btn" style={{ cursor: 'default', border: 'none' }}>...</span>
                    ) : (
                      <button
                        key={index}
                        className={`pagination-btn ${currentPage + 1 === pageNum ? 'active' : ''}`}
                        onClick={() => setCurrentPage(pageNum - 1)}
                      >
                        {pageNum}
                      </button>
                    )
                  ))}
                  
                  <button 
                    className="pagination-btn"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                  </button>
                  
                  <div className="pagination-info">
                    Showing {currentPage * eventsPerPage + 1}-{Math.min((currentPage + 1) * eventsPerPage, totalItems)} of {totalItems} events
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <h3>No Events Found</h3>
              <p>There are no events matching your current filter. Try selecting a different category or check back later for new events.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewEvents;