var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

var app = builder.Build();

if (app.Environment.IsDevelopment()) app.UseDeveloperExceptionPage();
else app.UseStatusCodePagesWithRedirects("error/{0}");

app.UseRouting();

app.UseStaticFiles();

app.MapDefaultControllerRoute();

app.Run();