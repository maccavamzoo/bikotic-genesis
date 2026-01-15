'use client'

import { useState } from 'react'

interface Employee {
  id: number
  name: string
  salary: number
}

interface BikeProduct {
  id: number
  name: string
  collapsed: boolean
  bikesPerYear: number
  tubingMaterials: number
  hoursPerFrame: number
  builderEmployeeId: number | null
  componentMarkup: number
  paintTradePrice: number
  groupsetTradePrice: number
  wheelsTradePrice: number
  otherPartsTradePrice: number
  targetProfit: number
  consumablesPerBike: number
  shippingPerBike: number
  contractorPerBike: number
  bikeBuildHours: number
  bikeBuildEmployeeId: number | null
}

export default function BikeBusinessCalculator() {
  // Currency formatter helper
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  
  // Fixed annual costs
  const [workshopRent, setWorkshopRent] = useState(12000);
  const [utilities, setUtilities] = useState(3000);
  const [insurance, setInsurance] = useState(1500);
  const [accountancy, setAccountancy] = useState(1200);
  const [software, setSoftware] = useState(500);
  const [toolMaintenance, setToolMaintenance] = useState(2000);
  const [businessRates, setBusinessRates] = useState(2000);
  const [marketing, setMarketing] = useState(2000);
  const [professionalFees, setProfessionalFees] = useState(1000);
  const [loanRepayments, setLoanRepayments] = useState(0);
  
  // Employees
  const [employees, setEmployees] = useState<Employee[]>([]);
  
  // Bike Products
  const [bikeProducts, setBikeProducts] = useState<BikeProduct[]>([
    {
      id: Date.now(),
      name: 'Bike 1',
      collapsed: false,
      bikesPerYear: 12,
      tubingMaterials: 400,
      hoursPerFrame: 40,
      builderEmployeeId: null,
      componentMarkup: 20,
      paintTradePrice: 500,
      groupsetTradePrice: 3000,
      wheelsTradePrice: 1500,
      otherPartsTradePrice: 1000,
      targetProfit: 3000,
      consumablesPerBike: 150,
      shippingPerBike: 100,
      contractorPerBike: 0,
      bikeBuildHours: 5,
      bikeBuildEmployeeId: null
    }
  ]);
  
  const addEmployee = () => {
    setEmployees([...employees, { id: Date.now(), name: '', salary: 30000 }]);
  };
  
  const removeEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };
  
  const updateEmployee = (id: number, field: keyof Employee, value: string | number) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, [field]: value } : emp
    ));
  };
  
  const addBikeProduct = () => {
    setBikeProducts([...bikeProducts, {
      id: Date.now(),
      name: `Bike ${bikeProducts.length + 1}`,
      collapsed: false,
      bikesPerYear: 10,
      tubingMaterials: 400,
      hoursPerFrame: 40,
      builderEmployeeId: null,
      componentMarkup: 20,
      paintTradePrice: 500,
      groupsetTradePrice: 3000,
      wheelsTradePrice: 1500,
      otherPartsTradePrice: 1000,
      targetProfit: 3000,
      consumablesPerBike: 150,
      shippingPerBike: 100,
      contractorPerBike: 0,
      bikeBuildHours: 5,
      bikeBuildEmployeeId: null
    }]);
  };
  
  const removeBikeProduct = (id: number) => {
    setBikeProducts(bikeProducts.filter(bike => bike.id !== id));
  };
  
  const updateBikeProduct = (id: number, field: keyof BikeProduct, value: string | number | boolean | null) => {
    setBikeProducts(bikeProducts.map(bike => 
      bike.id === id ? { ...bike, [field]: value } : bike
    ));
  };
  
  const toggleBikeCollapse = (id: number) => {
    setBikeProducts(bikeProducts.map(bike => 
      bike.id === id ? { ...bike, collapsed: !bike.collapsed } : bike
    ));
  };
  
  // Calculations for each bike product
  const calculateBikeRevenue = (bike: BikeProduct) => {
    const builder = employees.find(emp => emp.id === bike.builderEmployeeId);
    const builderHourlyRate = builder ? builder.salary / 1976 : 0;
    const frameBuildPrice = bike.hoursPerFrame * builderHourlyRate * 3;
    
    const bikeBuildEmployee = employees.find(emp => emp.id === bike.bikeBuildEmployeeId);
    const bikeBuildHourlyRate = bikeBuildEmployee ? bikeBuildEmployee.salary / 1976 : 0;
    const bikeBuildPrice = bike.bikeBuildHours * bikeBuildHourlyRate * 3;
    
    const markupMultiplier = 1 + (bike.componentMarkup / 100);
    const tubingCustomerPrice = bike.tubingMaterials * markupMultiplier;
    const paintCustomerPrice = bike.paintTradePrice * markupMultiplier;
    const groupsetCustomerPrice = bike.groupsetTradePrice * markupMultiplier;
    const wheelsCustomerPrice = bike.wheelsTradePrice * markupMultiplier;
    const otherPartsCustomerPrice = bike.otherPartsTradePrice * markupMultiplier;
    
    const revenuePerBike = tubingCustomerPrice + frameBuildPrice + bikeBuildPrice + paintCustomerPrice + 
                           groupsetCustomerPrice + wheelsCustomerPrice + otherPartsCustomerPrice + bike.targetProfit;
    
    return {
      revenuePerBike,
      totalRevenue: revenuePerBike * bike.bikesPerYear,
      frameBuildPrice,
      bikeBuildPrice,
      builderHourlyRate,
      bikeBuildHourlyRate,
      tubingCustomerPrice,
      paintCustomerPrice,
      groupsetCustomerPrice,
      wheelsCustomerPrice,
      otherPartsCustomerPrice
    };
  };
  
  const calculateBikeCosts = (bike: BikeProduct) => {
    const costsPerBike = bike.tubingMaterials + bike.paintTradePrice + 
                         bike.groupsetTradePrice + bike.wheelsTradePrice + bike.otherPartsTradePrice + 
                         bike.consumablesPerBike + bike.shippingPerBike + bike.contractorPerBike;
    return costsPerBike * bike.bikesPerYear;
  };
  
  // Total calculations
  const totalRevenue = bikeProducts.reduce((sum, bike) => sum + calculateBikeRevenue(bike).totalRevenue, 0);
  const totalVariableCosts = bikeProducts.reduce((sum, bike) => sum + calculateBikeCosts(bike), 0);
  const totalBikes = bikeProducts.reduce((sum, bike) => sum + bike.bikesPerYear, 0);
  
  const totalFixedCosts = workshopRent + utilities + insurance + accountancy + 
                         software + toolMaintenance + businessRates + marketing + 
                         professionalFees + loanRepayments;
  
  const totalEmployeeCosts = employees.reduce((sum, emp) => sum + Number(emp.salary), 0);
  
  const totalCosts = totalVariableCosts + totalFixedCosts + totalEmployeeCosts;
  const netProfit = totalRevenue - totalCosts;
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue * 100) : 0;
  const profitPerBike = totalBikes > 0 ? netProfit / totalBikes : 0;
  
  // Calculate employee workload
  const employeeWorkload = employees.map((emp: Employee) => {
    let totalHours = 0;
    
    bikeProducts.forEach((bike: BikeProduct) => {
      if (bike.builderEmployeeId === emp.id) {
        totalHours += bike.hoursPerFrame * bike.bikesPerYear;
      }
      if (bike.bikeBuildEmployeeId === emp.id) {
        totalHours += bike.bikeBuildHours * bike.bikesPerYear;
      }
    });
    
    const hoursPerWeek = totalHours / 52;
    const utilizationPercent = (totalHours / 1976) * 100;
    
    return {
      employee: emp,
      totalHours,
      hoursPerWeek,
      utilizationPercent
    };
  });
  
  return (
    <main className="min-h-screen p-4 md:p-8 font-sans bg-[#fafafa] pb-48">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-[#0a0a0a] font-bold">
            Bespoke Bicycle Business Profitability Calculator
          </h1>
          <p className="text-lg text-[#525252] max-w-4xl">
            Adjust the inputs below to model different scenarios for your framebuilding business
          </p>
        </section>
        
        {/* Employees Section */}
        <div className="bg-white border-2 border-gray-200 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-bikotic-blue">
            <h2 className="text-xl font-bold text-[#0a0a0a]">Employees</h2>
            <button
              onClick={addEmployee}
              className="flex items-center gap-2 px-4 py-2 bg-bikotic-blue text-white rounded-lg hover:bg-bikotic-blue-dark transition-colors"
            >
              <span className="text-xl">+</span>
              Add Employee
            </button>
          </div>
          
          {employees.length === 0 ? (
            <p className="text-[#525252] text-center py-4">No employees added. Add employees to calculate frame build pricing.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {employees.map((emp) => (
                  <div key={emp.id} className="p-4 border-2 border-gray-200 rounded-lg hover:border-bikotic-blue transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <input
                        type="text"
                        placeholder="Name/Role"
                        value={emp.name}
                        onChange={(e) => updateEmployee(emp.id, 'name', e.target.value)}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                      />
                      <button
                        onClick={() => removeEmployee(emp.id)}
                        className="ml-2 p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">£</span>
                      <input
                        type="number"
                        placeholder="Annual salary"
                        value={emp.salary}
                        onChange={(e) => updateEmployee(emp.id, 'salary', Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                      />
                    </div>
                    <p className="text-xs text-[#737373] mt-2">
                      £{(emp.salary / 1976).toFixed(2)}/hour
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                <p className="text-sm text-[#525252]">Total Annual Employee Costs</p>
                <p className="text-2xl font-bold text-[#0a0a0a]">£{formatCurrency(totalEmployeeCosts)}</p>
              </div>
            </>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Bike Products */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#0a0a0a]">Bike Products</h2>
              <button
                onClick={addBikeProduct}
                className="flex items-center gap-2 px-4 py-2 bg-bikotic-blue text-white rounded-lg hover:bg-bikotic-blue-dark transition-colors text-sm"
              >
                <span className="text-lg">+</span>
                Add Bike
              </button>
            </div>
            
            {bikeProducts.map((bike) => {
              const revenue = calculateBikeRevenue(bike);
              
              return (
                <div key={bike.id} className="bg-white border-2 border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  {/* Collapsed Header */}
                  <div className="p-4 bg-bikotic-blue/10 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <button
                        onClick={() => toggleBikeCollapse(bike.id)}
                        className="flex items-center gap-2 flex-1 text-left"
                      >
                        <span className="text-xl">{bike.collapsed ? '▶' : '▼'}</span>
                        <input
                          type="text"
                          value={bike.name}
                          onChange={(e) => updateBikeProduct(bike.id, 'name', e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="font-semibold text-[#0a0a0a] bg-transparent border-b border-transparent hover:border-gray-300 focus:border-bikotic-blue focus:outline-none px-1"
                        />
                      </button>
                      <button
                        onClick={() => removeBikeProduct(bike.id)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-[#525252]">Bikes/year:</label>
                      <input
                        type="number"
                        value={bike.bikesPerYear}
                        onChange={(e) => updateBikeProduct(bike.id, 'bikesPerYear', Number(e.target.value))}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                      />
                      <span className="text-sm text-[#525252] ml-auto">
                        £{formatCurrency(revenue.revenuePerBike)}/bike
                      </span>
                    </div>
                  </div>
                  
                  {/* Expanded Content */}
                  {!bike.collapsed && (
                    <div className="p-4">
                      {/* Frame Build */}
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-[#525252] mb-1">Hours to Build Frame</label>
                        <input
                          type="number"
                          value={bike.hoursPerFrame}
                          onChange={(e) => updateBikeProduct(bike.id, 'hoursPerFrame', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-[#525252] mb-1">Frame Builder</label>
                        <select
                          value={bike.builderEmployeeId || ''}
                          onChange={(e) => updateBikeProduct(bike.id, 'builderEmployeeId', e.target.value ? Number(e.target.value) : null)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                        >
                          <option value="">Select builder...</option>
                          {employees.map(emp => (
                            <option key={emp.id} value={emp.id}>
                              {emp.name || 'Unnamed'} (£{(emp.salary / 1976).toFixed(2)}/hr)
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {bike.builderEmployeeId && (
                        <div className="mb-3 p-3 bg-bikotic-blue/10 rounded-lg">
                          <p className="text-xs text-[#525252]">Frame Build Charge to Customer</p>
                          <p className="text-lg font-bold text-bikotic-blue">
                            £{revenue.frameBuildPrice.toFixed(0)}
                            <span className="text-sm font-normal text-[#525252] ml-2">
                              ({bike.hoursPerFrame}hrs × £{revenue.builderHourlyRate.toFixed(2)}/hr × 3)
                            </span>
                          </p>
                        </div>
                      )}
                      
                      {/* Components */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h3 className="font-semibold text-[#0a0a0a] mb-3">Components</h3>
                        
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-[#525252] mb-1">Component Markup %</label>
                          <input
                            type="number"
                            value={bike.componentMarkup}
                            onChange={(e) => updateBikeProduct(bike.id, 'componentMarkup', Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                          />
                        </div>
                        
                        {/* Tubing & Materials */}
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-[#525252] mb-1">Tubing & Materials (Trade Price)</label>
                          <div className="flex items-center gap-4">
                            <div className="relative flex-1">
                              <span className="absolute left-3 top-2.5 text-gray-500">£</span>
                              <input
                                type="number"
                                value={bike.tubingMaterials}
                                onChange={(e) => updateBikeProduct(bike.id, 'tubingMaterials', Number(e.target.value))}
                                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-2xl font-bold text-green-600">£{revenue.tubingCustomerPrice.toFixed(0)}</p>
                              <p className="text-xs text-[#737373]">Customer</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Painting */}
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-[#525252] mb-1">Painting (Trade Price)</label>
                          <div className="flex items-center gap-4">
                            <div className="relative flex-1">
                              <span className="absolute left-3 top-2.5 text-gray-500">£</span>
                              <input
                                type="number"
                                value={bike.paintTradePrice}
                                onChange={(e) => updateBikeProduct(bike.id, 'paintTradePrice', Number(e.target.value))}
                                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-2xl font-bold text-green-600">£{revenue.paintCustomerPrice.toFixed(0)}</p>
                              <p className="text-xs text-[#737373]">Customer</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Groupset */}
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-[#525252] mb-1">Groupset (Trade Price)</label>
                          <div className="flex items-center gap-4">
                            <div className="relative flex-1">
                              <span className="absolute left-3 top-2.5 text-gray-500">£</span>
                              <input
                                type="number"
                                value={bike.groupsetTradePrice}
                                onChange={(e) => updateBikeProduct(bike.id, 'groupsetTradePrice', Number(e.target.value))}
                                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-2xl font-bold text-green-600">£{revenue.groupsetCustomerPrice.toFixed(0)}</p>
                              <p className="text-xs text-[#737373]">Customer</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Wheels */}
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-[#525252] mb-1">Wheels (Trade Price)</label>
                          <div className="flex items-center gap-4">
                            <div className="relative flex-1">
                              <span className="absolute left-3 top-2.5 text-gray-500">£</span>
                              <input
                                type="number"
                                value={bike.wheelsTradePrice}
                                onChange={(e) => updateBikeProduct(bike.id, 'wheelsTradePrice', Number(e.target.value))}
                                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-2xl font-bold text-green-600">£{revenue.wheelsCustomerPrice.toFixed(0)}</p>
                              <p className="text-xs text-[#737373]">Customer</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Other Parts */}
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-[#525252] mb-1">Other Parts (Trade Price)</label>
                          <div className="flex items-center gap-4">
                            <div className="relative flex-1">
                              <span className="absolute left-3 top-2.5 text-gray-500">£</span>
                              <input
                                type="number"
                                value={bike.otherPartsTradePrice}
                                onChange={(e) => updateBikeProduct(bike.id, 'otherPartsTradePrice', Number(e.target.value))}
                                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-2xl font-bold text-green-600">£{revenue.otherPartsCustomerPrice.toFixed(0)}</p>
                              <p className="text-xs text-[#737373]">Customer</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Added Profit */}
                      <div className="mt-4 p-4 bg-amber-50 border-2 border-amber-400 rounded-lg">
                        <label className="block text-sm font-medium text-[#0a0a0a] mb-1">Added profit per bike 💰</label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-gray-500">£</span>
                          <input
                            type="number"
                            value={bike.targetProfit}
                            onChange={(e) => updateBikeProduct(bike.id, 'targetProfit', Number(e.target.value))}
                            className="w-full pl-8 pr-3 py-2 border-2 border-amber-400 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                          />
                        </div>
                      </div>
                      
                      {/* Variable Costs */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h3 className="font-semibold text-[#0a0a0a] mb-3">Variable Costs per Bike</h3>
                        
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-[#525252] mb-1">Hours for Bike Build</label>
                          <input
                            type="number"
                            value={bike.bikeBuildHours}
                            onChange={(e) => updateBikeProduct(bike.id, 'bikeBuildHours', Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                          />
                        </div>
                        
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-[#525252] mb-1">Bike Build Employee</label>
                          <select
                            value={bike.bikeBuildEmployeeId || ''}
                            onChange={(e) => updateBikeProduct(bike.id, 'bikeBuildEmployeeId', e.target.value ? Number(e.target.value) : null)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                          >
                            <option value="">Select employee...</option>
                            {employees.map(emp => (
                              <option key={emp.id} value={emp.id}>
                                {emp.name || 'Unnamed'} (£{(emp.salary / 1976).toFixed(2)}/hr)
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        {bike.bikeBuildEmployeeId && (
                          <div className="mb-3 p-3 bg-bikotic-blue/10 rounded-lg">
                            <p className="text-xs text-[#525252]">Bike Build Charge to Customer</p>
                            <p className="text-lg font-bold text-bikotic-blue">
                              £{revenue.bikeBuildPrice.toFixed(0)}
                              <span className="text-sm font-normal text-[#525252] ml-2">
                                ({bike.bikeBuildHours}hrs × £{revenue.bikeBuildHourlyRate.toFixed(2)}/hr × 3)
                              </span>
                            </p>
                          </div>
                        )}
                        
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-[#525252] mb-1">Consumables (gas, abrasives, etc.)</label>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-500">£</span>
                            <input
                              type="number"
                              value={bike.consumablesPerBike}
                              onChange={(e) => updateBikeProduct(bike.id, 'consumablesPerBike', Number(e.target.value))}
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                            />
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-[#525252] mb-1">Shipping per Bike</label>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-500">£</span>
                            <input
                              type="number"
                              value={bike.shippingPerBike}
                              onChange={(e) => updateBikeProduct(bike.id, 'shippingPerBike', Number(e.target.value))}
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                            />
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-[#525252] mb-1">Extra contractor costs</label>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-500">£</span>
                            <input
                              type="number"
                              value={bike.contractorPerBike}
                              onChange={(e) => updateBikeProduct(bike.id, 'contractorPerBike', Number(e.target.value))}
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Bike Profitability Summary */}
                      <div className="mt-4 p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border-2 border-yellow-400">
                        <h4 className="text-sm font-semibold text-yellow-400 mb-3">Profitability Summary</h4>
                        
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div>
                            <p className="text-xs text-gray-400">Selling Price</p>
                            <p className="text-lg font-bold text-white">£{formatCurrency(revenue.revenuePerBike)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Cost per Bike</p>
                            <p className="text-lg font-bold text-red-300">£{formatCurrency(calculateBikeCosts(bike) / bike.bikesPerYear)}</p>
                          </div>
                        </div>
                        
                        <div className="pt-3 border-t border-gray-700">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-300">Profit per Bike</span>
                            <span className={`text-xl font-bold ${
                              (revenue.revenuePerBike - (calculateBikeCosts(bike) / bike.bikesPerYear)) >= 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              £{formatCurrency(revenue.revenuePerBike - (calculateBikeCosts(bike) / bike.bikesPerYear))}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400">Profit Margin</span>
                            <span className={`text-sm font-semibold ${
                              (revenue.revenuePerBike - (calculateBikeCosts(bike) / bike.bikesPerYear)) >= 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {(((revenue.revenuePerBike - (calculateBikeCosts(bike) / bike.bikesPerYear)) / revenue.revenuePerBike) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        
                        {(revenue.revenuePerBike - (calculateBikeCosts(bike) / bike.bikesPerYear)) < 0 && (
                          <div className="mt-3 p-2 bg-red-900/50 rounded text-xs text-red-200">
                            ⚠️ This bike configuration is not profitable
                          </div>
                        )}
                        
                        {(revenue.revenuePerBike - (calculateBikeCosts(bike) / bike.bikesPerYear)) >= 0 && (
                          <div className="mt-3 text-xs text-gray-400">
                            Annual profit: £{formatCurrency((revenue.revenuePerBike - (calculateBikeCosts(bike) / bike.bikesPerYear)) * bike.bikesPerYear)}
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 p-4 bg-bikotic-blue/10 rounded-lg">
                        <p className="text-sm text-[#525252]">Selling Price per Bike</p>
                        <p className="text-2xl font-bold text-bikotic-blue">£{formatCurrency(revenue.revenuePerBike)}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Middle Column - Fixed Costs */}
          <div className="bg-white border-2 border-gray-200 rounded-lg shadow-sm p-6 h-fit">
            <h2 className="text-xl font-bold text-[#0a0a0a] mb-4 pb-2 border-b-2 border-bikotic-blue">Fixed Annual Costs</h2>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-[#525252] mb-1">Workshop Rent</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">£</span>
                  <input
                    type="number"
                    value={workshopRent}
                    onChange={(e) => setWorkshopRent(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#525252] mb-1">Utilities</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">£</span>
                  <input
                    type="number"
                    value={utilities}
                    onChange={(e) => setUtilities(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#525252] mb-1">Insurance</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">£</span>
                  <input
                    type="number"
                    value={insurance}
                    onChange={(e) => setInsurance(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#525252] mb-1">Accountancy</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">£</span>
                  <input
                    type="number"
                    value={accountancy}
                    onChange={(e) => setAccountancy(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#525252] mb-1">Software/Subscriptions</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">£</span>
                  <input
                    type="number"
                    value={software}
                    onChange={(e) => setSoftware(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#525252] mb-1">Tool Maintenance</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">£</span>
                  <input
                    type="number"
                    value={toolMaintenance}
                    onChange={(e) => setToolMaintenance(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#525252] mb-1">Business Rates</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">£</span>
                  <input
                    type="number"
                    value={businessRates}
                    onChange={(e) => setBusinessRates(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#525252] mb-1">Marketing</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">£</span>
                  <input
                    type="number"
                    value={marketing}
                    onChange={(e) => setMarketing(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#525252] mb-1">Professional Fees</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">£</span>
                  <input
                    type="number"
                    value={professionalFees}
                    onChange={(e) => setProfessionalFees(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#525252] mb-1">Loan Repayments</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">£</span>
                  <input
                    type="number"
                    value={loanRepayments}
                    onChange={(e) => setLoanRepayments(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bikotic-blue focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Results */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-lg p-6 text-white">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-yellow-400">Financial Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Revenue</span>
                  <span className="text-xl font-semibold">£{formatCurrency(totalRevenue)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Variable Costs</span>
                  <span className="text-xl font-semibold text-red-300">£{formatCurrency(totalVariableCosts)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Fixed Costs</span>
                  <span className="text-xl font-semibold text-red-300">£{formatCurrency(totalFixedCosts)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Employee Costs</span>
                  <span className="text-xl font-semibold text-red-300">£{formatCurrency(totalEmployeeCosts)}</span>
                </div>
                
                <div className="pt-3 mt-3 border-t-2 border-gray-600">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Costs</span>
                    <span className="text-xl font-semibold text-red-300">£{formatCurrency(totalCosts)}</span>
                  </div>
                </div>
                
                <div className="pt-4 mt-4 border-t-2 border-yellow-400">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold">Net Profit/Loss</span>
                    <span className={`text-3xl font-bold ${netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      £{formatCurrency(netProfit)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">Profit Margin</span>
                    <span className={`font-semibold ${profitMargin >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {profitMargin.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-gray-300">Profit per Bike</span>
                    <span className={`font-semibold ${profitPerBike >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      £{formatCurrency(profitPerBike)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-gray-300">Total Bikes</span>
                    <span className="font-semibold text-white">
                      {totalBikes}
                    </span>
                  </div>
                </div>
                
                {netProfit < 0 && (
                  <div className="mt-4 p-3 bg-red-900/50 rounded-lg border border-red-500">
                    <p className="text-sm text-red-200 font-semibold">⚠️ Business is not profitable at current settings</p>
                  </div>
                )}
                
                {netProfit >= 0 && netProfit < 10000 && (
                  <div className="mt-4 p-3 bg-yellow-900/50 rounded-lg border border-yellow-500">
                    <p className="text-sm text-yellow-200 font-semibold">⚠️ Low profit margin - consider adjustments</p>
                  </div>
                )}
                
                {netProfit >= 10000 && (
                  <div className="mt-4 p-3 bg-green-900/50 rounded-lg border border-green-500">
                    <p className="text-sm text-green-200 font-semibold">✓ Business is profitable</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Employee Workload */}
            {employees.length > 0 && (
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-lg p-6 text-white">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-bikotic-blue">Employee Workload</h2>
                
                <div className="space-y-3">
                  {employeeWorkload.map(({ employee, totalHours, hoursPerWeek, utilizationPercent }) => {
                    const isOverCapacity = hoursPerWeek > 40;
                    const isUnderUtilized = utilizationPercent < 50;
                    
                    return (
                      <div key={employee.id} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-gray-100">
                            {employee.name || 'Unnamed'}
                          </span>
                          <span className={`text-sm font-semibold ${
                            isOverCapacity ? 'text-red-400' : 
                            isUnderUtilized ? 'text-yellow-400' : 
                            'text-green-400'
                          }`}>
                            {utilizationPercent.toFixed(0)}% utilized
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-400 text-xs">Hours/Year</p>
                            <p className="text-white font-semibold">{totalHours.toFixed(0)} hrs</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Hours/Week</p>
                            <p className={`font-semibold ${
                              isOverCapacity ? 'text-red-400' : 'text-white'
                            }`}>
                              {hoursPerWeek.toFixed(1)} hrs
                            </p>
                          </div>
                        </div>
                        
                        {isOverCapacity && (
                          <div className="mt-2 p-2 bg-red-900/30 rounded text-xs text-red-200">
                            ⚠️ Over capacity - consider adding staff
                          </div>
                        )}
                        
                        {isUnderUtilized && totalHours > 0 && (
                          <div className="mt-2 p-2 bg-yellow-900/30 rounded text-xs text-yellow-200">
                            💡 Under-utilized - could take more work
                          </div>
                        )}
                        
                        {totalHours === 0 && (
                          <div className="mt-2 p-2 bg-gray-700/30 rounded text-xs text-gray-400">
                            Not assigned to any bikes
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-400">
                  <p>💡 Standard capacity: 1,976 hours/year (40 hrs/week × 52 weeks - holidays)</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 shadow-2xl border-t-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-300 text-sm">Annual Net Profit/Loss</p>
              <p className="text-gray-400 text-xs">{totalBikes} bikes • £{formatCurrency(totalRevenue)} revenue</p>
            </div>
            <div className="text-right">
              <p className={`text-4xl font-bold ${netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {netProfit >= 0 ? '+' : ''}£{formatCurrency(netProfit)}
              </p>
              <p className={`text-sm font-semibold ${netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {profitMargin.toFixed(1)}% margin • £{formatCurrency(profitPerBike)}/bike
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
