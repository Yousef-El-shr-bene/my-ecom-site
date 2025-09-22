todo 
Task: Build a Landing Page with Add to Cart & Cash on Delivery (COD) Checkout

Core Requirements
	1.	Landing Page & Cart

	•	Header with store name + cart item counter.
	•	Hero section with product image, name, price, and Add to Cart button.
	•	Product details/features section.
	•	Cart sidebar or popup:
	•	List items (name, price, quantity, subtotal).
	•	Ability to change quantity and remove items.
	•	Display total + Checkout button.
	•	Checkout form (COD only):
	•	Fields: Full Name, Phone Number, City/Region, Address, Notes (optional).
	•	Shipping options: Standard vs Express (different shipping fees).
	•	On submit: generate a fake order number and show a confirmation screen.

	2.	Logic (No real backend)

	•	Store cart data in localStorage.
	•	Recalculate total dynamically (subtotal + shipping fee).
	•	On “Place Order (COD)”:
	•	Basic validation (e.g., name ≥ 3 chars, phone = digits only, 10–15 length).
	•	Generate an order ID like ORD-<date><random>.
	•	Clear the cart and show a confirmation with order summary.

	3.	Responsive Design

	•	Mobile-first (works well at ≤375px), then scales for tablet and desktop.

	4.	Accessibility

	•	Proper field labels, logical tab order, sufficient color contrast.

	5.	Performance & Simplicity

	•	Plain HTML/CSS/JS or React/Vue (your choice).
	•	No real backend required. Mock data (JSON file or array) is enough.

⸻

Optional (Nice-to-Have)
	•	Top notification bar (e.g., Free shipping above X amount).
	•	Discount code (e.g., SAVE10 → 10% off).
	•	Simple stock check (max quantity = 5 per item).
	•	Log fake analytics events (e.g., console.log("AddToCart"), console.log("Purchase")).

⸻

Deliverables
	•	GitHub repo + README with setup/run instructions.
	•	At least 1 screenshot or GIF showing: Add to cart → Checkout → Confirmation.
	•	If using React/Vite: npm install && npm run dev. If vanilla: open index.html.