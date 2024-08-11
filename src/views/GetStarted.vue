<script setup></script>
<template>

    <div style="
        text-align: center !important;
        display: flex;
        align-items: center;
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #f5f5f5;
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
    ">
    <RouterLink :to="{ name: 'demo', params: { modelName: 'project_0' } }" class="btn btn-dark d-flex flex-row"
    style="background-color: #15171a !important; width: fit-content; position:absolute; top: 10px; left: 10px;"><p style="font-weight: bold; margin-right: 1ch;">ByPass</p></RouterLink>
    
        <main class="form-signin">
            <form>
                <h1 class="h3 mb-5 fw-normal">Please sign in</h1>

                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                    <label for="floatingInput">Name</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                    <label for="floatingInput">Email address</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                    <label for="floatingPassword">Password</label>
                </div>

                <div class="checkbox mb-3">

                </div>
                <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                <p class="mt-5 mb-3 text-muted">©MyAssembly.co 2024</p>
            </form>
        </main>
    </div>
</template>

<style>

.form-signin{
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
}

</style>
