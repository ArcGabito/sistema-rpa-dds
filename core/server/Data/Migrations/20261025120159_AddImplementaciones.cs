using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddImplementaciones : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ItemsPase",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProcesoProyectoId = table.Column<int>(type: "int", nullable: false),
                    Clave = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    Estado = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Nota = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    ActualizadoPorId = table.Column<int>(type: "int", nullable: true),
                    ActualizadoAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemsPase", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemsPase_AdminUsers_ActualizadoPorId",
                        column: x => x.ActualizadoPorId,
                        principalTable: "AdminUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_ItemsPase_ProcesosProyecto_ProcesoProyectoId",
                        column: x => x.ProcesoProyectoId,
                        principalTable: "ProcesosProyecto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItemsPase_ActualizadoPorId",
                table: "ItemsPase",
                column: "ActualizadoPorId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemsPase_ProcesoProyectoId_Clave",
                table: "ItemsPase",
                columns: new[] { "ProcesoProyectoId", "Clave" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemsPase");
        }
    }
}
