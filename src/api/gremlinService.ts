import { Gremlin } from "../types/Gremlin";
import axiosInstance from "./api-client";

class GremlinService {
    getGremlinById(gremlinId: number) {
        const controller = new AbortController();
        const request = axiosInstance.get<Gremlin>(`/gremlin/${gremlinId}`, {
            signal: controller.signal,
        });
        return {
            request,
            cancel: () => controller.abort()
        };
    }

    getGremlinsByUser() {
        const controller = new AbortController();
        const request = axiosInstance.get<Gremlin[]>(`/gremlin/currentgremlins`, {
            signal: controller.signal,
        });
        return {
            request,
            cancel: () => controller.abort()
        };
    }

    getOldGremlinsByUser() {
        const controller = new AbortController();
        const request = axiosInstance.get<Gremlin[]>(`/gremlin/oldgremlins`, {
            signal: controller.signal,
        });
        return {
            request,
            cancel: () => controller.abort()
        };
    }

    deleteGremlin(gremlinId: number) {
        const controller = new AbortController();
        const request = axiosInstance.delete(`/gremlin/${gremlinId}`, {
            signal: controller.signal,
        });
        return {
            request,
            cancel: () => controller.abort()
        };
    }

    updateGremlin(gremlin: Gremlin) {
        const controller = new AbortController();
        const request = axiosInstance.put(`/gremlin/`, gremlin, {
            signal: controller.signal,
        });
        return {
            request,
            cancel: () => controller.abort()
        };
    }

    createGremlin(gremlin: Gremlin) {
        const controller = new AbortController();
        const request = axiosInstance.post(`/gremlin/`, gremlin, {
            signal: controller.signal,
        });
        return {
            request,
            cancel: () => controller.abort()
        };
    }
}

export default new GremlinService();
