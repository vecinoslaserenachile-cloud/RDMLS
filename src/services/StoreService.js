/**
 * StoreService: Gestión de Carrito y Órdenes para la Tienda 3D VLS
 */
class StoreService {
    constructor() {
        this.storageKey = 'vls_store_orders';
    }

    getOrders() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("VLS Store Error:", e);
            return [];
        }
    }

    saveDesign(design) {
        const orders = this.getOrders();
        const newDesign = {
            ...design,
            id: `DES-${Date.now()}`,
            status: 'preparation',
            createdAt: new Date().toISOString()
        };
        orders.push(newDesign);
        localStorage.setItem(this.storageKey, JSON.stringify(orders));
        return newDesign;
    }

    placeOrder(order) {
        const orders = this.getOrders();
        const updatedOrders = orders.map(o => 
            o.id === order.id ? { ...o, status: 'process', paidAt: new Date().toISOString() } : o
        );
        
        // If it's a new order (not from saved designs)
        if (!orders.find(o => o.id === order.id)) {
            updatedOrders.push({
                ...order,
                id: `ORD-${Date.now()}`,
                status: 'process',
                paidAt: new Date().toISOString(),
                createdAt: new Date().toISOString()
            });
        }
        
        localStorage.setItem(this.storageKey, JSON.stringify(updatedOrders));
        return updatedOrders;
    }

    deleteOrder(orderId) {
        const orders = this.getOrders();
        const filtered = orders.filter(o => o.id !== orderId);
        localStorage.setItem(this.storageKey, JSON.stringify(filtered));
        return filtered;
    }
}

export default new StoreService();
