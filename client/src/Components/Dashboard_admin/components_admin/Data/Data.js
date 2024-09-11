import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilSignOutAlt,
    UilMoneyWithdrawal,
    UilUsdSquare
  } from "@iconscout/react-unicons";
  
  export const SidebarData = [
    {
      icon: UilEstate,
      heading: "Dashboard",
      link: 'Dashboard'
    },
    {
      icon: UilClipboardAlt,
      heading: "Orders",
      link: 'Show_orders'
    },
    {
      icon: UilUsersAlt,
      heading: "Customers",
      link: 'Customers'
    },
    {
      icon: UilPackage,
      heading: "Products",
      link: 'ProductsCustomer'
    },
    {
      icon: UilChart,
      heading: "Deals",
      link: 'DealsAdmin'
    },
  ];
  
  export const fetchRequestsData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/Requests_all');
      if (!response.ok) {
        throw new Error('Failed to fetch requests data');
      }
      const data = await response.json();
  
      return {
        data: data.requests,
        totalRequests: data.totalRequests,
      };
    } catch (error) {
      console.error('Error fetching requests data:', error);
      return {
        data: [],
        totalRequests: 0,
        error: error.message,
      };
    }
  };

  export const fetchTotalQuantity = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/getTotalQuantity');
      if (!response.ok) {
        throw new Error('Failed to fetch total quantity');
      }
      const data = await response.json();
      
      return {
        totalQuantity: data.total_quantity,
      };
    } catch (error) {
      console.error('Error fetching total quantity:', error);
      return {
        totalQuantity: 0,
        error: error.message,
      };
    }
  };


  export const fetchTotalRevenue = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/getTotalRevenue');
      if (!response.ok) {
        throw new Error('Failed to fetch total quantity');
      }
      const data = await response.json();
      
      return {
        totalAmount: data.totalAmount,
      };
    } catch (error) {
      console.error('Error fetching total quantity:', error);
      return {
        totalAmount: 0,
        error: error.message,
      };
    }
  };
  
  
  export const CardsDataTemplate = [
    {
      title: "Sales",
      color: {
        backGround: 'linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)',
        boxShadow: '0px 10px 20px 0px #e0c6f5'
      },
      barValue: 0,
      value: '0',
      png: UilMoneyWithdrawal,
      series: [{
        name: 'Sales',
        data: []
      }],
    },
    {
      title: "Revenue",
      color: {
        backGround: 'linear-gradient(180deg, #FF919D 0%, #FC929D 100%)',
        boxShadow: '0px 10px 20px 0px #FDC0C7'
      },
      barValue: 0,
      value: '0',
      png: UilUsdSquare,
      series: [
        {
          name: 'Revenue',
          data: []
        },
      ],
    },
    {
      title: "Requests",
      color: {
        backGround: 'linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255, 202, 113) -46.42%)',
        boxShadow: '0px 10px 20px 0px #F9D59B'
      },
      barValue: 0,
      value: '0', // Placeholder value, will be updated dynamically
      png: UilClipboardAlt,
      series: [
        {
          name: 'Requests',
          data: []
        },
      ],
    },
  ];
  
  