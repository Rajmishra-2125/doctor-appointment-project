import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Automatically intercepts route changes in React Router to intelligently
 * generate and map corresponding <title> and <meta name="description"> strings.
 */
const DynamicMetadata = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    
    let title = "MediCare";
    let desc = "MediCare - Your trusted health partner for online medical appointments.";

    // Parse the path to auto-generate a sleek title
    if (path === "/" || path === "/home") {
        title = "MediCare | Book Doctors & Clinic Appointments";
    } else {
        // Extract the last segment of the path
        const segments = path.split('/').filter(Boolean);
        if (segments.length > 0) {
            let lastSegment = segments[segments.length - 1];
            
            // Format Mongo ID strings or hyphens gracefully
            if (lastSegment.length > 15) {
                lastSegment = segments[segments.length - 2] || "Details";
            }
            
            // Convert "my-appointments" to "My Appointments"
            let formattedSegment = lastSegment
                 .split('-')
                 .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                 .join(' ');
            
            // Inject structural mappings based on subdirectories
            if(segments[0] === 'admin') title = `Admin | ${formattedSegment}`;
            else if(segments[0] === 'doctor') title = `Doctor | ${formattedSegment}`;
            else title = `${formattedSegment} | MediCare`;
        }
    }

    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
    }
    metaDesc.content = desc;

  }, [location]);

  return null;
};

export default DynamicMetadata;
