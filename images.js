// DeskNerdHQ — Article Image Mapping
// Using Unsplash source URLs (free, high-quality stock photos)

const articleImages = {
  'best-standing-desks-2026': 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=500&fit=crop',
  'best-ergonomic-chairs-2026': 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&h=500&fit=crop',
  'best-monitors-home-office-2026': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=500&fit=crop',
  'best-webcam-2026': 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=800&h=500&fit=crop',
  'best-monitor-arms-2026': 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=500&fit=crop&q=80',
  'best-mechanical-keyboards-office-2026': 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=500&fit=crop',
  'best-desk-lighting-2026': 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=500&fit=crop',
  'home-office-cable-management-guide': 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=500&fit=crop',
  'best-usb-c-hubs-docking-stations-2026': 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&h=500&fit=crop',
  'best-under-desk-treadmill-2026': 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=500&fit=crop',
  'standing-desk-vs-sitting-productivity': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop',
  'home-office-setup-guide-complete': 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=500&fit=crop',
  'best-office-footrest-2026': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=500&fit=crop',
  'best-desk-mat-2026': 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=500&fit=crop',
  'best-noise-cancelling-headphones-office-2026': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=500&fit=crop',
  'best-laptop-stand-2026': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=500&fit=crop',
  'best-desk-organizer-2026': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=500&fit=crop',
  'best-ergonomic-mouse-2026': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=500&fit=crop',
  'best-power-strip-desk-2026': 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=500&fit=crop&q=80',
  'home-office-lighting-guide': 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=500&fit=crop&q=80',
  'best-office-speakers-2026': 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=500&fit=crop',
  'best-webcam-light-2026': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=500&fit=crop',
  'best-white-noise-machine-office-2026': 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=500&fit=crop&q=70',
  'best-standing-desk-mat-2026': 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=500&fit=crop&q=70',
  'best-wireless-charger-desk-2026': 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=500&fit=crop',
  'best-desk-shelf-riser-2026': 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=500&fit=crop&q=70',
  'herman-miller-aeron-vs-steelcase-leap': 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&h=500&fit=crop&q=70',
  'best-desk-plants-low-light-2026': 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&h=500&fit=crop',
  'best-external-ssd-2026': 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&h=500&fit=crop',
  'best-standing-desk-converter-2026': 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=500&fit=crop&q=85',
  'best-budget-office-chair-under-300': 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&h=500&fit=crop&q=85',
  'best-4k-monitor-home-office-2026': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=500&fit=crop&q=85',
  'best-desk-for-dual-monitors-2026': 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=500&fit=crop&q=80',
  'best-wrist-rest-keyboard-2026': 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=500&fit=crop&q=85',
  'home-office-air-quality-guide': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop&q=85',
  'best-desk-cable-management-kit-2026': 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=500&fit=crop&q=85',
  'best-office-chair-for-back-pain-2026': 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&h=500&fit=crop&q=80',
};

// Category hero images
const categoryImages = {
  'standing-desks': 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&h=400&fit=crop',
  'chairs': 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=1200&h=400&fit=crop',
  'monitors': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1200&h=400&fit=crop',
  'accessories': 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=1200&h=400&fit=crop',
  'ergonomics': 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=1200&h=400&fit=crop',
  'guides': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=400&fit=crop',
};

module.exports = { articleImages, categoryImages };
