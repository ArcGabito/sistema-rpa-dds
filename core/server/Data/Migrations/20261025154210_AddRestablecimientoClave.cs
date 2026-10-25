using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddRestablecimientoClave : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "SesionesDesdeUtc",
                table: "AdminUsers",
                type: "datetime2",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "RestablecimientosClave",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UsuarioId = table.Column<int>(type: "int", nullable: false),
                    TokenHash = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    ExpiraAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UsadoAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Ip = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RestablecimientosClave", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RestablecimientosClave_AdminUsers_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "AdminUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RestablecimientosClave_TokenHash",
                table: "RestablecimientosClave",
                column: "TokenHash",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RestablecimientosClave_UsuarioId_CreatedAtUtc",
                table: "RestablecimientosClave",
                columns: new[] { "UsuarioId", "CreatedAtUtc" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RestablecimientosClave");

            migrationBuilder.DropColumn(
                name: "SesionesDesdeUtc",
                table: "AdminUsers");
        }
    }
}
