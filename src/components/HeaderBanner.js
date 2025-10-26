// // // src/components/HeaderBanner.jsx
// // import React from "react";
// // import "./HeaderBanner.css";

// // const HeaderBanner = ({ onLogin, onRegister, user, onLogout }) => {
// //   const imageUrl =
// //     "https://images.unsplash.com/photo-1518600506278-4e8ef466b810?auto=format&fit=crop&w=1600&q=80";

// //   return (
// //     <header className="header-banner" style={{ backgroundImage: `url(${imageUrl})` }}>
// //       <div className="banner-inner">
// //         <div className="brand">
// //           <span role="img" aria-label="party">🎉</span>
// //           <h1>Virtual Event Hosting Platform</h1>
// //           <p className="tagline">Discover & host virtual events — RSVP, manage & collaborate.</p>
// //         </div>

// //         <div className="actions">
// //           {!user ? (
// //             <>
// //               <button className="btn outline" onClick={onLogin}>Login</button>
// //               <button className="btn primary" onClick={onRegister}>Register</button>
// //             </>
// //           ) : (
// //             <>
// //               <div className="welcome">Welcome, <strong>{user.name}</strong></div>
// //               <button className="btn outline" onClick={onLogout}>Logout</button>
// //             </>
// //           )}
// //         </div>
// //       </div>
// //     </header>
// //   );
// // };

// // export default HeaderBanner;

// // src/components/HeaderBanner.js
// import React from "react";
// import "./HeaderBanner.css";

// const HeaderBanner = () => (
//   <header
//     className="header-banner"
//     style={{
//       backgroundImage:
//         "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1500&q=80')",
//     }}
//   >
//     <div className="overlay">
//       <h1>🎯 Event2Way</h1>
//       <p>
//         Connect. Collaborate. Celebrate. <br />
//         Your all-in-one platform to host and join virtual events with ease.
//       </p>
//     </div>
//   </header>
// );

// export default HeaderBanner;