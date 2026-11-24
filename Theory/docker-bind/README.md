# Docker Bind Mount Hands-on

**Course:** Backend Development (CSFS3008) — Theory Unit 4 L37–L39  
**Author:** Ansh Tyagi  
**SAP ID:** 590014867  

---

## 1. Overview
A **Bind Mount** maps a host directory or file directly into a container's filesystem. Unlike Docker named volumes (which Docker manages inside `/var/lib/docker`), bind mounts provide direct access to host files, making them ideal for local development, hot reloading, and configuration injection.

---

## 2. Hands-on Execution Commands

### Step 1: Run an Alpine or Ubuntu Container with Bind Mount
```bash
# Using modern --mount flag (Recommended)
docker run -it --rm \
  --mount type=bind,source="$(pwd)/test.txt",target=/app/test.txt \
  alpine cat /app/test.txt

# Or using legacy -v flag
docker run -it --rm \
  -v "${PWD}/test.txt:/app/test.txt:ro" \
  alpine cat /app/test.txt
```

### Step 2: Verify Two-Way Live Synchronization
1. Edit `test.txt` on your host machine.
2. In the container terminal, run `cat /app/test.txt` and observe the update immediately without rebuilding the image.
