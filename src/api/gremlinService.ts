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

    getGremlinsByUser(userId: number) {
        const controller = new AbortController();
        const request = axiosInstance.get<Gremlin[]>(`/gremlin/currentgremlins`, {
            signal: controller.signal,
        });
        return {
            request,
            cancel: () => controller.abort()
        };
    }

    getOldGremlinsByUser(userId: number) {
        const controller = new AbortController();
        const request = axiosInstance.get<Gremlin[]>(`/gremlin/oldgremlins`, {
            signal: controller.signal,
        });
        return {
            request,
            cancel: () => controller.abort()
        };
    }

    deleteGremlin(userId: number, gremlinId: number) {
        const controller = new AbortController();
        const request = axiosInstance.delete(`/gremlin/${gremlinId}`, {
            signal: controller.signal,
        });
        return {
            request,
            cancel: () => controller.abort()
        };
    }

    updateGremlin(userId: number, gremlin: Gremlin) {
        const controller = new AbortController();
        const request = axiosInstance.put(`/gremlin/`, gremlin, {
            signal: controller.signal,
        });
        return {
            request,
            cancel: () => controller.abort()
        };
    }

    createGremlin(userId: number, gremlin: Gremlin) {
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
