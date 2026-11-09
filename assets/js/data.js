// SimplyBuySell Data Store
const SB_DATA = {
  properties: [
    {
      id: "prop-1",
      title: "Luxury Villa",
      type: "Villas",
      tag: "For Sale",
      tagColor: "green",
      location: "Vizag",
      address: "Rushikonda Beach Road, Visakhapatnam",
      price: "₹ 1.25 Cr",
      priceRaw: 12500000,
      specs: "4 BHK | 3200 Sq.Ft.",
      bhk: "4 BHK",
      area: "3200 Sq.Ft.",
      rating: 4.8,
      reviewsCount: 120,
      image: "assets/images/prop-villa.png",
      featured: true,
      description: "Ultra-luxury modern sea-view villa with Italian marble flooring, private infinity pool, landscaped garden, modular German kitchen, and private elevator. Located in prime Rushikonda with 24/7 high-security gated community.",
      amenities: ["Private Swimming Pool", "Landscaped Garden", "Covered Car Parking (2 Cars)", "100% Power Backup", "Vaastu Compliant", "Clubhouse & Gym"]
    },
    {
      id: "prop-2",
      title: "Modern Apartment",
      type: "Flats",
      tag: "For Rent",
      tagColor: "blue",
      location: "Kakinada",
      address: "Subhash Nagar, Main Commercial Road, Kakinada",
      price: "₹ 25,000 / Month",
      priceRaw: 25000,
      specs: "2 BHK | 1200 Sq.Ft.",
      bhk: "2 BHK",
      area: "1200 Sq.Ft.",
      rating: 4.6,
      reviewsCount: 88,
      image: "assets/images/prop-apartment.png",
      featured: true,
      description: "Sophisticated brand new 2 BHK apartment in prime Kakinada. Contemporary architecture, spacious balcony with garden view, premium fittings, high-speed elevators, and round-the-clock security.",
      amenities: ["Gated Community", "High-speed Lift", "Reserved Parking", "CCTV Surveillance", "Children Play Area", "24/7 Water Supply"]
    },
    {
      id: "prop-3",
      title: "Residential Plot",
      type: "Plots",
      tag: "For Sale",
      tagColor: "orange",
      location: "Rajahmundry",
      address: "Airport Road, Diwancheruvu, Rajahmundry",
      price: "₹ 40 Lakhs",
      priceRaw: 4000000,
      specs: "200 Sq.Yds",
      bhk: "Plot",
      area: "200 Sq.Yds",
      rating: 4.7,
      reviewsCount: 75,
      image: "assets/images/prop-plot.png",
      featured: true,
      description: "Prime clear-title residential open plot in an approved gated venture. Wide 40ft blacktop roads, avenue plantation, underground drainage, water line to every plot, immediate spot registration available.",
      amenities: ["CRDA/DTCP Approved", "40ft Wide BT Roads", "Underground Drainage", "Electricity with Transformers", "Compound Wall Gated", "Spot Registration"]
    },
    {
      id: "prop-4",
      title: "Independent House",
      type: "Houses",
      tag: "For Sale",
      tagColor: "green",
      location: "Tirupati",
      address: "Near Alipiri Bypass Road, Tirupati",
      price: "₹ 85 Lakhs",
      priceRaw: 8500000,
      specs: "3 BHK | 1800 Sq.Ft.",
      bhk: "3 BHK",
      area: "1800 Sq.Ft.",
      rating: 4.9,
      reviewsCount: 110,
      image: "assets/images/prop-house.png",
      featured: true,
      description: "Custom architect-built double-storey independent house. East facing with 100% Vaastu compliance. Spacious master suites, granite flooring, teakwood doors, sweet groundwater borewell, and rooftop terrace garden.",
      amenities: ["100% Vaastu Compliant", "Sweet Groundwater Borewell", "Teak Wood Main Doors", "Covered Car Porch", "Rooftop Garden Terrace", "Solar Water Heating"]
    },
    {
      id: "prop-5",
      title: "Commercial Space",
      type: "Commercial",
      tag: "For Rent",
      tagColor: "blue",
      location: "Guntur",
      address: "Arundelpet Main Commercial Boulevard, Guntur",
      price: "₹ 50,000 / Month",
      priceRaw: 50000,
      specs: "1000 Sq.Ft.",
      bhk: "Commercial",
      area: "1000 Sq.Ft.",
      rating: 4.5,
      reviewsCount: 60,
      image: "assets/images/prop-commercial.png",
      featured: true,
      description: "Prime corner commercial glass-facade showroom/office space located on highest footfall main road. Complete fire safety clearance, 3-phase high capacity power, dedicated visitor parking, and high ceiling height.",
      amenities: ["Prime Main Road Facing", "Full Glass Elevation", "Dedicated Customer Parking", "High Speed Passenger Lift", "Three Phase Power", "Fire Safety Certified"]
    },
    {
      id: "prop-6",
      title: "Farm Land",
      type: "Farm Lands",
      tag: "For Sale",
      tagColor: "orange",
      location: "Nellore",
      address: "NH-16 Highway Corridor, Nellore Rural",
      price: "₹ 1.2 Cr",
      priceRaw: 12000000,
      specs: "5 Acres",
      bhk: "Agricultural / Farm",
      area: "5 Acres",
      rating: 4.8,
      reviewsCount: 95,
      image: "assets/images/prop-farmland.png",
      featured: true,
      description: "Lush green 5-acre agricultural and farmhouse land with direct highway approach road. Features 3 active borewells with copious sweet water, drip irrigation pipeline, solar fencing, farm shed, and clear Patta passbook titles.",
      amenities: ["Direct Highway Access", "3 Running Borewells", "Solar Security Fencing", "Drip Irrigation Setup", "Farmhouse Worker Quarters", "Clear Patta Passbook Title"]
    },
    {
      id: "prop-7",
      title: "Amaravathi LPS Plot",
      type: "Plots",
      tag: "For Sale",
      tagColor: "green",
      location: "Amaravathi",
      address: "Mandadam Sector 2, Amaravathi Capital Region",
      price: "₹ 65 Lakhs",
      priceRaw: 6500000,
      specs: "250 Sq.Yds",
      bhk: "Residential LPS",
      area: "250 Sq.Yds",
      rating: 4.9,
      reviewsCount: 140,
      image: "assets/images/feat-amara.png",
      featured: false,
      description: "Original government allotted CRDA Amaravathi LPS residential plot near Secretariat and Seed Access Road. Guaranteed high appreciation potential in AP's state capital.",
      amenities: ["CRDA Allocated", "60ft Master Plan Road", "Underground Utility Ducting", "Direct Allotment Letter", "Immediate Title Deed Transfer"]
    },
    {
      id: "prop-8",
      title: "2nd Pooling Agriculture Land",
      type: "Plots",
      tag: "For Sale",
      tagColor: "orange",
      location: "Amaravathi",
      address: "Thullur Mandal, Amaravathi 2nd Pooling Zone",
      price: "₹ 1.8 Cr",
      priceRaw: 18000000,
      specs: "2.5 Acres",
      bhk: "Land Pooling",
      area: "2.5 Acres",
      rating: 4.7,
      reviewsCount: 52,
      image: "assets/images/feat-pool.png",
      featured: false,
      description: "Verified 2nd pooling eligible prime agricultural land parcel in Thullur. 100% verified revenue documentation with survey verification and Adangal records.",
      amenities: ["Official Land Pooling Zone", "Survey Verification Done", "Clear Title Adangal Record", "Direct Road Access", "Immediate Agreement"]
    }
  ],

  reviews: [
    {
      id: "rev-1",
      name: "Rahul Sharma",
      rating: 5.0,
      date: "2 days ago",
      avatar: "assets/images/reviewer-rahul.png",
      quote: "SimplyBuySell made my property buying journey smooth and transparent. Highly recommended!",
      role: "Property Buyer (Vizag)",
      verified: true
    },
    {
      id: "rev-2",
      name: "Priya Mehta",
      rating: 5.0,
      date: "1 week ago",
      avatar: "assets/images/reviewer-priya.png",
      quote: "Excellent service, professional team and genuine support throughout the process.",
      role: "Villa Investor (Kakinada)",
      verified: true
    },
    {
      id: "rev-3",
      name: "Amit Verma",
      rating: 5.0,
      date: "2 weeks ago",
      avatar: "assets/images/reviewer-amit.png",
      quote: "A trustworthy platform for all real estate needs. Very easy and user-friendly!",
      role: "Plot Buyer (Amaravathi)",
      verified: true
    },
    {
      id: "rev-4",
      name: "Sneha Reddy",
      rating: 5.0,
      date: "3 weeks ago",
      avatar: "assets/images/avatar-sneha.png",
      quote: "Amazing platform! Found my dream home within just 10 days of searching.",
      role: "Home Owner (Tirupati)",
      verified: true
    },
    {
      id: "rev-5",
      name: "Rahul Varma",
      rating: 5.0,
      date: "1 month ago",
      avatar: "assets/images/avatar-rahul.png",
      quote: "Very helpful and easy to use. The paperwork support and transparency were exceptional.",
      role: "Land Seller (Rajahmundry)",
      verified: true
    },
    {
      id: "rev-6",
      name: "Priya Sharma",
      rating: 5.0,
      date: "1 month ago",
      avatar: "assets/images/avatar-priya.png",
      quote: "Trusted and reliable service! Their team guided us with honesty at every single step.",
      role: "NRI Investor",
      verified: true
    }
  ],

  stats: {
    happyCustomers: "10,000+",
    averageRating: "4.8/5",
    satisfactionRate: "95%",
    trustBadge: "Trusted by Thousands"
  },

  mottoPoints: [
    {
      id: 1,
      title: "Customer Interest Comes First",
      desc: "Our customers' benefit is more important to us than our own profit.",
      icon: "fa-users"
    },
    {
      id: 2,
      title: "We Value Your Dreams",
      desc: "Every buy or sell in real estate is linked to someone's hard-earned money, aspirations and future. We respect that deeply.",
      icon: "fa-home"
    },
    {
      id: 3,
      title: "Trust, Clarity and Right Information",
      desc: "We believe that trust, transparency and accurate information are essential in this process.",
      icon: "fa-handshake"
    },
    {
      id: 4,
      title: "A Transparent & Responsible Platform",
      desc: "With this vision, SimplyBuySell is here to offer you transparent, simple and responsible real estate services.",
      icon: "fa-laptop"
    },
    {
      id: 5,
      title: "Our Role",
      desc: "Our team helps buyers find properties that match their needs and supports sellers in connecting with the right buyers.",
      icon: "fa-user-group"
    },
    {
      id: 6,
      title: "Complete & Clear Information",
      desc: "We strive to provide clear details about the property, price and available documents, so you can make an informed and confident decision.",
      icon: "fa-file-lines"
    }
  ],

  aboutPoints: [
    {
      id: 1,
      title: "15 Years of Experience",
      desc: "Serving in the real estate industry for the past 15 years.",
      icon: "fa-calendar-days",
      badge: "15 Years"
    },
    {
      id: 2,
      title: "More Than a Transaction",
      desc: "Buying or selling a property is not just a financial deal, but a key decision for a family's future and hard-earned savings.",
      icon: "fa-house-user"
    },
    {
      id: 3,
      title: "Trust, Clarity and Right Information",
      desc: "We believe that trust, transparency and accurate information are essential in this process.",
      icon: "fa-handshake"
    },
    {
      id: 4,
      title: "A Transparent & Responsible Platform",
      desc: "With this vision, SimplyBuySell is here to offer you transparent, simple and responsible real estate services.",
      icon: "fa-laptop"
    },
    {
      id: 5,
      title: "Our Role",
      desc: "Our team helps buyers find properties that match their needs and supports sellers in connecting with the right buyers.",
      icon: "fa-user-group"
    },
    {
      id: 6,
      title: "Complete & Clear Information",
      desc: "We strive to provide clear details about the property, price and available documents, so you can make an informed and confident decision.",
      icon: "fa-file-lines"
    }
  ]
};

