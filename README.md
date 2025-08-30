# Survival 2070 Dashboard

## Project Overview
**Survival 2070** is a futuristic resource management dashboard that simulates survival conditions in a sci-fi environment.  
Users manage critical resources—**Food**, **Water**, **Energy**, and **Credits**—over time while monitoring system status and purchasing supplies.  
The dashboard provides real-time feedback with progress bars, alerts, and status indicators to help users make strategic decisions.

---

## Technologies Used
- **HTML5** – Structure and layout of the dashboard  
- **CSS3 / TailwindCSS** – Responsive styling, gradients, neon effects, and animations  
- **JavaScript (Vanilla)** – Dynamic updates, calculations, and user interactions  
- **Git & GitHub** – Version control and repository hosting  
- **Web Browser** – Chrome, Firefox, Edge, or any modern browser

---

## Dependencies
- **Modern Web Browser** (Chrome, Firefox, Edge, etc.)  
- **Internet Connection** – Required to load TailwindCSS from CDN  

---

## Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/dgaurav8052/Survival-2070.git
cd Survival-2070

    Open the project

    Open index.html in a web browser

    No server setup needed; it runs entirely on the client-side

Usage Instructions

    Click Buy Supplies to increase Food (+15) and Water (+20) at a cost of 20 Credits

    Monitor Energy, Days Left, and Supplies in real-time

    Alerts appear automatically when resources are critically low

    Credits increase automatically over time (+5 every 10 seconds)

Key Formulas & Mechanics
Metric	Formula / Value
Energy	(Food + Water) × 5
Days Left	Energy ÷ 10
Daily Consumption	-2 Food, -3 Water (per 3 seconds)
Buy Supplies	+15 Food, +20 Water, cost 20 Credits
Maximum Values	Food = 100, Water = 100, Energy = 500, Credits = 200
Alerts & Status Indicators

    Alerts appear when:
        Food ≤ 10 → “Food critically low!”
        Water ≤ 10 → “Water critically low!”
        Energy ≤ 100 → “Energy dangerously low!”
        Days Left ≤ 5 → “Survival time critical!”

    Status Indicators:
        System Status (Energy-based): OPTIMAL / CAUTION / CRITICAL
        Resource Level (Food + Water): STABLE / LOW / CRITICAL
        Mission Time (Days Left): EXTENDED / LIMITED / EMERGENCY

Colors change dynamically:
    Green → Safe
    Yellow → Warning
    Red → Critical

License

Open for educational purposes. You can fork and experiment freely.
Author

Gaurav Dwivedi

GitHub: https://github.com/dgaurav8052

Email: dgaurav8052@gmail.com
